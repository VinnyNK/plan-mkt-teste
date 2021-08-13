<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends BaseController
{
    public function index(): JsonResponse
    {
        $users = User::all();

        return $this->sendResponse(UserResource::collection($users), 'Usuários listados com sucesso');
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->all());

        $this->fileValidate($request, $user);

        $user->fill([
            'password' => Hash::make($request->getPassword())
        ])->save();

        return $this->sendResponse(new UserResource($user), 'Usuário criado com sucesso', 201);
    }

    public function show(User $user): JsonResponse
    {
        return $this->sendResponse(new UserResource($user), 'Usuário encontrado com sucesso');
    }

    public function update(StoreUserRequest $request, User $user): JsonResponse
    {
        $user->update($request->all());

        if($user->wasChanged('password')) {
            $user->fill([
                'password' => Hash::make($request->getPassword())
            ])->save();
        }

        if($user->wasChanged('photo')) {
            $this->fileValidate($request, $user);

            $user->save();
        }

        return $this->sendResponse(new UserResource($user), 'Usuário alterado com sucesso');
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return $this->sendResponse([], 'Usuário excluído com sucesso');
    }

    private function checkFileExist($fileToCheck): bool|string
    {
        $md5File = md5_file($fileToCheck);
        $files = Storage::disk('public')->allFiles();
        foreach ($files as $file) {
            if (md5_file(Storage::disk('public')->path($file)) == $md5File) {
                return Storage::disk('public')->url($file);
            }
        }
        return false;
    }

    public function fileValidate(StoreUserRequest $request, User $user): void
    {
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $fileExist = $this->checkFileExist($request->photo->getRealPath());
            if ($fileExist) {
                $user->photo = $fileExist;
            } else {
                $path = $request->photo->store('photos', 'public');
                $user->photo = Storage::disk('public')->url($path);
            }
        }
    }
}
