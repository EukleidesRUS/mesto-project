//для взаимодействия с сервером
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    authorization: "3f517560-6810-4f6e-85f4-a622ffc466c9",
    "Content-Type": "application/json",
  },
};

//Проверка статуса запроса
const onResponce = function (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
  );
};

//Запрос данных пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(onResponce);
};

//Изменение данных пользователя
export const editUserInfo = (userName, userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userInfo,
    }),
  }).then(onResponce);
};

//Запрос изначальных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(onResponce);
};

//Добавление новой карточки
export const addNewCard = (placeName, imageLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: imageLink,
    }),
  }).then(onResponce);
};

//Лайки
export const addHandleLikes = (id, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers,
  }).then(onResponce);
};

//Удаление карточки
export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponce);
};

//Изменение аватара
export const editUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(onResponce);
};
