import "../pages/index.css";

import {
  popupAddForm,
  profileName,
  profileCaption,
  profileImg,
  placesElements,
  profileFormSubmit,
  formChangeAvatar,
} from "./data";

import {
  createCard,
  addCard
} from "./card";

import {
  saveInfoPtofile,
  changeAvatar
} from "./profile";

import {
  closePopupByEscAndClickOverlay
} from "./utils";

import {
  editProfileInfo,
  openAddCardPopup,
  openChangeAvatarPopup,
} from "./modal";

import {
  enableValidation
} from "./validate.js";

import { api
} from "./api.js";

import {
  Promise
} from "core-js";

export let userDataFromServer = null;

openChangeAvatarPopup();
openAddCardPopup();
editProfileInfo();
closePopupByEscAndClickOverlay();

formChangeAvatar.addEventListener("submit", (evt) =>  changeAvatar(evt,api));
profileFormSubmit.addEventListener("submit",(evt) =>  saveInfoPtofile(evt,api));
popupAddForm.addEventListener("submit",(evt) => addCard(evt,api));

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userDataFromServer = userData;
    profileName.textContent = userData.name;
    profileCaption.textContent = userData.about;
    profileImg.src = userData.avatar;
    const cards = cardsData.map((card) => createCard(card, userData._id, api));
    placesElements.prepend(...cards);
  })
  .catch((err) => console.log(err));

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
