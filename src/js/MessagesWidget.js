import MessageWidget from "./MessageWidget";
import Message from "./Message";

export default class MessagesWidget {
  constructor(ownerElement, chatWidget) {
    this.element = this.createElement(ownerElement);
    this.messageWidgets = [];
    this.chatWidget = chatWidget;
    this.addListeners();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("messages");
    element.innerHTML = `
      <div class="messages-feed">
        
      </div>
      <div class="messages-input-panel">
        <input type="text" class="message-input-text">
        <input type="button" class="message-input-button" value="Отправить">
      </div>
    `;
    ownerElement.appendChild(element);
    return element;
  }

  addListeners() {
    this.onMessageInputButtonClick = this.onMessageInputButtonClick.bind(this);
    this.messageInputButtonElement.addEventListener("click", this.onMessageInputButtonClick);
  }

  get messagesFeedElement() {
    return this.element.querySelector(".messages-feed");
  }

  get messageInputTextElement() {
    return this.element.querySelector(".message-input-text");
  }

  get messageInputButtonElement() {
    return this.element.querySelector(".message-input-button");
  }

  get currentUser() {
    return this.chatWidget.currentUser;
  }

  onMessageInputButtonClick() {
    const text = this.messageInputTextElement.value;
    this.chatWidget.sendMessage(new Message(this.currentUser, new Date(), text));
  }

  receivedMessage(data) {
    this.messageWidgets.push(new MessageWidget(this.messagesFeedElement, this, data));
  }
}
