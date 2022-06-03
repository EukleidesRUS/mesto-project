export default class Card {
  constructor(
    { selector },
    card,
    api,
    user,
    handleCardClick,
    handleCardDelete
  ) {
    this._selector = selector;
    this._name = card.name; //Название карточки
    this._image = card.link; //Ссылка на картинку
    this._id = card._id; //идентификатор карточки
    this._ownerId = card.owner._id; //идентификатор пользователя, который создал карточку
    this._likes = card.likes; //массив пользователей лайкнувших карточку
    this._api = api;
    this._user = user; //объект с данными о пользователе
    this._userId = user._id; //id пользователя
    this._card = card; //объект с данными карточки

    this._handleCardClick = handleCardClick; //метод открытия попапа увеличенного фото
    this._handleCardDelete = handleCardDelete; //метод открытия попапа подтверждения удаления карточки

    this._element = this._getElement();

    this._cardTitle = this._element.querySelector(".place__title");
    this._cardImage = this._element.querySelector(".place__image");
    this._cardLikesCounter = this._element.querySelector(
      ".place__likes-counter"
    );
    this._cardLikeButton = this._element.querySelector(".place__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".place__delete-button"
    );
  }

  //Клонируем шаблон
  _getElement() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
  }

  //Создаем карточку
  generate() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;

    this._cardDeleteButton.classList.toggle(
      "place__delete-button_hidden",
      this._ownerId !== this._userId
    );

    this._checkLike(this._likes);
    this._setEventListeners();

    return this._element;
  }

  _checkLike(likes) {
    this._cardLikesCounter.textContent = `${this._likes.length}`;
    if (likes.some((like) => like._id === this._userId)) {
      this._cardLikeButton.classList.add("place__like-button_active");
    }
  }

  //Постановка/снятие лайка
  _handleLikes() {
    const myLike = this._likes.find((like) => like._id === this._userId);
    const method = myLike !== undefined ? "DELETE" : "PUT";
    this._api
      .addHandleLikes(this._id, method)
      .then((data) => {
        this._likes = data.likes;
        this._cardLikesCounter.textContent = `${this._likes.length}`;

        if (this._likes.some((like) => like._id === this._userId)) {
          this._cardLikeButton.classList.add("place__like-button_active");
        } else {
          this._cardLikeButton.classList.remove("place__like-button_active");
        }
      })
      .catch((err) => console.log(err));
  }

  //Вешаем слушатели на кнопки карточки
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikes();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleCardDelete(this._id, this._element);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  }
}
