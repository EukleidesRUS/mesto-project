import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imgTitle = document.querySelector('.popup__image-caption');
    this._imgLink = document.querySelector('.popup__fullscreen-image');
  }

  open(name, link) {
    super.open();
    this._imgLink.src = link;
    this._imgTitle.alt = name;
    this._imgTitle.textContent = name;
  }
}
