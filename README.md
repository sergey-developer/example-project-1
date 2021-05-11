# Useful links

### example react application with protected route

Protected route: `http://localohost:3030/private`

[Link to repository](https://bitbucket.org/example-project/example-project_identity/src/dev/src/examples/react-example/)

The application already configured to use test Identity server instance (config located in `.env.development` file)

### swagger-ui for User Management API

[Link](https://auth-test.example-project.com/swagger)

### swagger-ui for example-project Providers API

[Link](http://35.225.16.242:6002/swagger/index.html)

## Deployment
### requirements
#### nodejs
version: `14.15.5`

#### yarn
`npm install -global yarn`

### build
1. `yarn install`
2. `yarn build`

### start app
`yarn start`

### config
#### папка build
- build лежит в папке: `build`
- Перенести папку `build` на сервер

#### JSON evn config
- Конфиг положить в папку `public`
    - В ней лежит `index.html` и т.д.
- Его название - `envConfig`
    - Это важно, для его получения по сети
- Пример конфига
```
{
  "oidcClientId": "OCBrowserLocal",
  "baseAuthApiUrl": "https://auth-test.example-project.com",
  "baseFilesApiUrl": "http://file.example-project.site",
  "baseProviderApiUrl": "http://35.225.16.242:6002"
}
```

#### nginx
Пример конфига:
```
server {
    listen 80;
    listen [::]:80;

    root /var/www/your_domain/html;
    index index.html index.htm index.nginx-debian.html;
    
    server_name your_domain www.your_domain;
    
    location / {
            try_files $uri $uri/ =404;
    }
}
```
