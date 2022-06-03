import "../pages/index.css";

import {
  popupAddForm,
  profileFormSubmit,
  formChangeAvatar,
  settings,
  openImage,
  profileEditButton,
  profileAvatarContainer,
  confirmForm,
  addCardButton,
} from "../components/utils/data.js";

import { api } from "../components/api.js";

import UserInfo from "../components/UserInfo";

import Section from "../components/Section";

import Card from "../components/Сard";

import FormValidator from "../components/FormValidator.js";

import PopupConfirmDeleteCard from "../components/PopupConfirmDeleteCard";

import PopupWithImage from "../components/PopupWithImage";

import PopupWithForm from "../components/PopupWithForm";

//Валидация
const formValidators = {}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, settings)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);


let userDataFromServer = null;

const cardList = new Section(renderCard, ".elements");

//Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  nameInput: ".info-box__name",
  aboutInput: ".info-box__caption",
  avatarLink: ".profile__avatar-img",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userDataFromServer = userData;
    userInfo.setUserInfo(userDataFromServer);
    cardList.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

//Удаление карточки со страницы
const popupConfirmDeleteCard = new PopupConfirmDeleteCard(
  "#confirm",
  function () {
    popupConfirmDeleteCard.renderLoading(true, "Да");
    api
      .deleteCard(popupConfirmDeleteCard._id)
      .then(() => {
        popupConfirmDeleteCard.card.remove();
        popupConfirmDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupConfirmDeleteCard.renderLoading(false, "Да");
      });
  },
  confirmForm
);

//Попап с изображением
const popupWithImage = new PopupWithImage("#openImage");

//Попап редактирования профиля
const popupChangeUserInfo = new PopupWithForm(
  "#editPopup",
  function (data) {
    popupChangeUserInfo.renderLoading(true);
    api
      .editUserInfo(data.username, data.operation)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupChangeUserInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupChangeUserInfo.renderLoading(false);
      });
  },
  profileFormSubmit
);

//Попап редактирования аватара
const popupChangeUserAvatar = new PopupWithForm(
  "#changeAvatarPopup",
  function (data) {
    popupChangeUserAvatar.renderLoading(true);
    api
      .editUserAvatar(data["avatar-link"])
      .then((user) => {
        userInfo.setUserInfo(user);
        popupChangeUserAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupChangeUserAvatar.renderLoading(false);
      });
  },
  formChangeAvatar
);

//Попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(
  "#addPopup",
  function (data) {
    popupAddNewCard.renderLoading(true, "Создать");
    api
      .addNewCard(data.placename, data.imagelink)
      .then((card) => {
        cardList.addItem(card);
        popupAddNewCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddNewCard.renderLoading(false, "Создать");
      });
  },
  popupAddForm
);

//слушатель открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  popupChangeUserInfo.setInputValues(userInfo.getInfoProfile());
  popupChangeUserInfo.open();
  formValidators['profile-edit'].resetValidation();
});

//слушатель открытия попапа изменения аватара
profileAvatarContainer.addEventListener("click", () => {
  popupChangeUserAvatar.open();
  formValidators['changeAvatar'].resetValidation();
});

//слушатель открытия попапа добавлени карточки
addCardButton.addEventListener("click", () => {
  popupAddNewCard.open();
  formValidators['add-places'].resetValidation();
});

popupWithImage.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupChangeUserInfo.setEventListeners();
popupChangeUserAvatar.setEventListeners();
popupAddNewCard.setEventListeners();

function renderCard(item) {
  const newCard = new Card(
    {
      selector: ".card-template",
    },
    item,
    api,
    userDataFromServer,
    handleCardClick,
    handleCardDelete
  ).generate();

  return newCard;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardDelete(id, element) {
  popupConfirmDeleteCard.open(id, element);
}


