import Popup from "./Popup";

export default class PopupConfirmDeleteCard extends Popup{
  constructor(selector, submitForm, form) {
    super(selector)
    this._submitForm = submitForm;

    this._form = form;
    this._buttonSubmit = this._form.querySelector(".popup__submit");
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector("#confirmDeleteButton")
     .addEventListener("click", this._submitForm);
  }

  open(id, card) {
    this._id = id;
    this.card = card;
    super.open();
  }
}

