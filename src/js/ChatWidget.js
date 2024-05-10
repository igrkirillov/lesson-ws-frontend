import UsersWidget from "./UsersWidget";
import MessagesWidget from "./MessagesWidget";

export default class ChatWidget {
  constructor(ownerElement, user) {
    this.element = this.createElement(ownerElement);
    this.user = user;
    this.usersWidget = new UsersWidget(this.element, this);
    this.messagesWidget = new MessagesWidget(this.element, this);
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("chat");
    ownerElement.appendChild(element);
    return element;
  }

  get currentUser() {
    return this.user;
  }
}
