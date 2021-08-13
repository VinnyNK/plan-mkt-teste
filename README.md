#Plan-Mkt-Teste

## Passos Backend
```
  cd api-teste
```

```
  composer install
```

### configurar bd no arquivo .env
```
  DB_USERNAME=
  DB_PASSWORD=
```

```
   php artisan db:create
```

```
  php artisan migrate
```
 
```
  php artisan storage:link
```

```
  php artisan serve
```

## Passos Frontend

```
  cd frontend-teste
```

```
  npm i
```

```
  npm run serve
```

### acessar http://localhost:8080/
