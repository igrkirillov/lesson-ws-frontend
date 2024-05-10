import {getNextImage} from "./utils";

export default class UserWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("user");
    element.innerHTML = `
        <img class="user-ava" src="${getNextImage()}" alt="No photo">
        <span class="user-name">Alexandra</span>
    `;
    ownerElement.appendChild(element);
    return element;
  }
}
