# docker-hub-webhook

Проект по созданию сервера для деплоя с docker-hub
## Starting
для запуска надо выполнить следующее:

`npm start`

## Configuration
**Настройка** локальных переменных проводится с помощью изменения переменных в index.js:

`token` - уникальная строка используемая в url

`username` - имя пользователя docker hub

`password` - пароль пользователя docker hub

`service` - имя будущего контейнера

## Configuration docker hub
**Настройка** на стороне docker hub:
создать webhook по ссылке http://192.168.0.1:3000/webhook/ `token`

Любые пожелания вносить в issues, возможно они будут реализованы.
