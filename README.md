## Mongodb-Express-React-Node

:black_small_square:

### Установка:

---

###### Server.
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
1. ```git clone https://github.com/rezervec/mern_cars-table.git```
2. ```npm install```
3. Ставим порт сервера: ```.env``` *или оставляем 555*

---

###### DB.
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
1. Ставим uri для Mongodb: ```.env``` *или оставляем мой*
- Документация Mongodb:
https://www.mongodb.com/docs/

---

###### Client.
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
1. ```cd public_html```
2. ```npm install```
3. ```npm run build```
4. Меняем адрес, на который будут отправляться запросы с клиента: ```src/utils/consts.js``` *или оставляем localhost*
5. Поменять количество отображаемых автомобилей на странице: ```src/utils/consts.js``` *или оставляем 20*

---



### Запуск:

---

В корневой папке:
```npm run server```

---

:black_small_square:

### Функционал:
---
- Просмотр автомобилей, которые хранятся в базе и их характеристик. Выбор марки автомобиля и модели.
- **NEW** - Исправлен баг, при котором в селектор моделей попадали повторяющиеся.

![Screenshot](https://github.com/rezervec/mern_cars-table/raw/master/screenshots/screen1.png)