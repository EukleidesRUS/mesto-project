export default class UserInfo {
  constructor({ nameInput, aboutInput, avatarLink }) {
    this._nameInput = document.querySelector(nameInput);
    this._aboutInput = document.querySelector(aboutInput);
    this._avatarLink = document.querySelector(avatarLink);
  }

  getInfoProfile() {
    return {
      username: this._nameInput.textContent,
      operation: this._aboutInput.textContent,
      avatarLink: this._avatarLink.src,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameInput.textContent = name;
    this._aboutInput.textContent = about;
    this._avatarLink.src = avatar;
  }
}
