import {getNextImage} from "./utils";

export default class UserWidget {
  constructor(ownerElement, user) {
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement, user);
    this.user = user;
  }

  createElement(ownerElement, user) {
    const element = document.createElement("div");
    element.classList.add("user");
    element.innerHTML = `
        <img class="user-ava" src="${getNextImage()}" alt="No photo">
        <span class="user-name">${user.name}</span>
    `;
    ownerElement.appendChild(element);
    return element;
  }

  remove() {
    this.ownerElement.removeChild(this.element);
  }
}
