const pageContent = document.querySelector(".content");

//Шаблон карточки
const cardTemplate = document.querySelector(".card-template").content;

//Поля вставки значений из редактора профиля
const profile = pageContent.querySelector(".profile");
const profileInfo = pageContent.querySelector(".profile__info-box");

const profileName = profileInfo.querySelector(".info-box__name");
const profileCaption = profileInfo.querySelector(".info-box__caption");
const profileAvatarContainer = profile.querySelector(".profile__avatar");
const profileImg = profile.querySelector(".profile__avatar-img");

//Редактирование
//Попап редактирования профиля
const editPopup = document.querySelector("#editPopup");
//Кнопка редактирования профиля
const profileEditButton = profileInfo.querySelector(".info-box__edit-button");
//Форма отправки информации профиля
const profileFormSubmit = editPopup.querySelector(".popup__form");
//Поле ввода "Имя профиля" в форме редактирования профиля
const nameInput = editPopup.querySelector(".popup__input_data_name");
//Поле ввода "Деятельность" в форме редактирования профиля
const operationInput = editPopup.querySelector(".popup__input_data_operation");
//Кнопка сабмита профиля
const profileSubmitButton = profileFormSubmit.querySelector(".popup__submit");

//Добавление карточек
//Попап добавления карточек мест
const addPopup = document.querySelector("#addPopup");
//Кнопка добавления карточки места
const addCardButton = profile.querySelector(".profile__add-button");
//Форма добавления карточек
const popupAddForm = addPopup.querySelector(".popup__form");
//Кнопка сабмита формы добавления карточки
const popupSubmitButton = popupAddForm.querySelector(".popup__submit");
//Поле ввода названия карточки места
const nameCardInput = addPopup.querySelector(".popup__input_data_name");
//Поле для ввода ссылки на картинку места
const linkCardInput = addPopup.querySelector(".popup__input_data_operation");

const confirmPopup = document.querySelector("#confirm");
const confirmForm = confirmPopup.querySelector(".popup__form");
const confirmSubmitButton = confirmForm.querySelector(".popup__submit");

const popupCloseButton = confirmPopup.querySelector(".popup__close");

//Попап изменения аватара
const changeAvatarPopup = document.querySelector("#changeAvatarPopup");

//Форма изменения фото аватара
const formChangeAvatar = changeAvatarPopup.querySelector(".popup__form");
//Поле ввода ссылки на картинку аватара
const linkAvatarInput = changeAvatarPopup.querySelector("#avatar-link");
//Кнопка сабмита формы изменения аватара
const changeAvatarSubmit = changeAvatarPopup.querySelector(".popup__submit");

//Открытие изображения
//Попап открытия изображения
const openImage = document.querySelector("#openImage");
//Картинка
const popupImage = openImage.querySelector(".popup__fullscreen-image");
//Подпись к картинке
const popupImageCaption = openImage.querySelector(".popup__image-caption");

//Секция в которую вставляем карточки
const placesElements = pageContent.querySelector(".elements");
const settings = {
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inactiveButtonClass: "popup__submit_disabled",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
};

export {
  pageContent,
  cardTemplate,
  profile,
  profileInfo,
  profileName,
  profileCaption,
  profileAvatarContainer,
  editPopup,
  profileEditButton,
  profileFormSubmit,
  nameInput,
  operationInput,
  addPopup,
  addCardButton,
  popupAddForm,
  nameCardInput,
  linkCardInput,
  openImage,
  popupImage,
  popupImageCaption,
  placesElements,
  popupSubmitButton,
  changeAvatarPopup,
  formChangeAvatar,
  linkAvatarInput,
  changeAvatarSubmit,
  profileImg,
  confirmPopup,
  confirmSubmitButton,
  confirmForm,
  profileSubmitButton,
  popupCloseButton,
  settings,
};
