import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, form) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = form;
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._buttonSubmit = this._form.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // renderLoading(isLoading) {
  //   if (isLoading) {
  //     this._buttonSubmit.textContent = "Сохранение...";
  //   } else {
  //     this._buttonSubmit.textContent = "Сохранить";
  //   }
  // }

  close() {
    super.close();
    this._form.reset();
  }
}


