import UsersWidget from "./UsersWidget";
import MessagesWidget from "./MessagesWidget";
import {
  addWsMessageListener,
  createWebSocket,
  sendWsExit,
  sendWsMessage,
} from "./serverApi";

export default class ChatWidget {
  constructor(ownerElement, user) {
    this.element = this.createElement(ownerElement);
    this.user = user;
    this.ws = createWebSocket();
    this.usersWidget = new UsersWidget(this.element, this);
    this.messagesWidget = new MessagesWidget(this.element, this);
    this.addListeners();
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

  addListeners() {
    const messageCallback = this.messagesWidget.receivedMessage.bind(
      this.messagesWidget
    );
    const usersCallback = this.usersWidget.reload.bind(this.usersWidget);
    addWsMessageListener(this.ws, messageCallback, usersCallback);
    window.addEventListener("beforeunload", this.sendExitMessage.bind(this));
  }

  sendExitMessage() {
    sendWsExit(this.ws, this.currentUser);
  }

  sendMessage(message) {
    sendWsMessage(this.ws, message);
  }
}
