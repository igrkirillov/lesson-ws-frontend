import UserWidget from "./UserWidget";

export default class UsersWidget {
  constructor(ownerElement, chatWidget) {
    this.element = this.createElement(ownerElement);
    this.userWidgets = [];
    this.chatWidget = chatWidget;

    this.userWidgets.push(new UserWidget(this.element));
    this.userWidgets.push(new UserWidget(this.element));
    this.userWidgets.push(new UserWidget(this.element));
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("users");
    ownerElement.appendChild(element);
    return element;
  }
}
