### Monitor-soft-test

Это тестовый проект на React.js

Посмотреть можно по адресу:
### https://build.pavelsalf.now.sh/

Приложение отображает список пользователей, позволяет добавлять и редактировать этот список.

Есть возможность регистрации и логина в тестовом режиме, для проверки этой функции используйте данные:

Login:
E-mail: eve.holt@reqres.in
Password: cityslicka

Register:
E-mail: eve.holt@reqres.in
Password: pistol


### В проекте используюется:

React.js (Create-react-app),
axios - для отправки запросов на сервер,
classnames - для удобной работ с CSS-стилями,
gh-pages - для деплоя на GitHubPages (в тестовом режиме),
react-loader-spinner - для визуализации процесса загрузки


### Архитектура:

Существует основной компонент App.js в котором содержится логика и основные состояния приложения
Существует модуль api.js через который осуществляется связь с сервером и передача данных в App.js
Все дочерние компоненты получают данные и функции для взаимодействия с App.js из него же
