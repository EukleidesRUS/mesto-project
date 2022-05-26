//для взаимодействия с сервером
export class Api{
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  //Проверка статуса запроса
  _onResponse = function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Что-то пошло не так: Ошибка ${res.status} - ${res.statusText}`
    );
  };

  //Запрос данных пользователя
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._onResponse(res));
  };

  //Изменение данных пользователя
  editUserInfo = (userName, userInfo) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userInfo,
      }),
    }).then((res) => this._onResponse(res));
  };

  //Запрос изначальных карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._onResponse(res));
  };

//Добавление новой карточки
  addNewCard = (placeName, imageLink) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: imageLink,
      }),
    }).then((res) => this._onResponse(res));
  };

//Лайки
  addHandleLikes = (id, method) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    }).then((res) => this._onResponse(res));
  };

//Удаление карточки
  deleteCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._onResponse(res));
  };

//Изменение аватара
  editUserAvatar = (link) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._onResponse(res));
  };
}

//Создание экземпляра класса Api
export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "3e17db6a-6951-46bf-9280-ebc36e39e39a",
    "Content-Type": "application/json"
  },
});

