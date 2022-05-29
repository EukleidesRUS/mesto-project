//для взаимодействия с сервером
export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  //Проверка статуса запроса
  _onResponse = (res) => {
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
    }).then(this._onResponse);
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
    }).then(this._onResponse);
  };

  //Запрос изначальных карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._onResponse);
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
    }).then(this._onResponse);
  };

  //Лайки
  addHandleLikes = (id, method) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    }).then(this._onResponse);
  };

  //Удаление карточки
  deleteCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._onResponse);
  };

  //Изменение аватара
  editUserAvatar = (link) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._onResponse);
  };
}

//Создание экземпляра класса Api
// export const api = new Api({
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
//   headers: {
//     authorization: "3e17db6a-6951-46bf-9280-ebc36e39e39a",
//     "Content-Type": "application/json",
//   },
// });
export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "cda53605-ab20-47f0-90b4-9efa5160708a",
    "Content-Type": "application/json",
  },
});



