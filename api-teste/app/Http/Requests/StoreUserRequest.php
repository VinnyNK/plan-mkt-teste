<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * @property mixed user
 */
class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:80',
            'email' => 'required|email|unique:users,email,'. $this->user?->id,
            'password' => $this->user?->id ? 'sometimes|' : '' . 'required|string|min:8',
            'phone' => 'required|numeric',
            'photo' => $this->user?->id ? 'sometimes|' : '' . 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nome é requerido',
            'name.max' => 'Nome não pode conter mais de 80 caracteres',
            'email.required' => 'E-mail é requerido',
            'email.email' => 'E-mail deve ser uma conta válida',
            'email.unique' => 'E-mail ja utilizado',
            'password.required' => 'Senha é requerido',
            'password.string' => 'Senha deve ser do tipo string',
            'password.min' => 'Senha deve conter ao menos 8 caracteres',
            'phone.required' => 'Telefone é requerido',
            'phone.numeric' => 'Telefone deve conter apenas números',
            'photo.required' => 'Foto é requerido',
            'photo.image' => 'Foto deve ser formato válido',
            'photo.max' => 'Foto não pode exceder 2048 Mb'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = [
            'success' => false,
            'message' => 'Erro na validação',
        ];


        if(!empty($validator->errors())){
            $response['data'] = $validator->errors();
        }

        throw new HttpResponseException(response()->json($response, 400));
    }
}
