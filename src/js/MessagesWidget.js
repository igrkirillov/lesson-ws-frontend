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
    this.onMessageInputTextKeyDown = this.onMessageInputTextKeyDown.bind(this);
    this.messageInputButtonElement.addEventListener(
      "click",
      this.onMessageInputButtonClick
    );
    this.messageInputTextElement.addEventListener(
      "keydown",
      this.onMessageInputTextKeyDown
    );
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
    this.sendMessage(this.messageInputTextElement.value);
    this.messageInputTextElement.value = "";
  }

  onMessageInputTextKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.sendMessage(this.messageInputTextElement.value);
      this.messageInputTextElement.value = "";
    }
  }

  sendMessage(text) {
    this.chatWidget.sendMessage(
      new Message(this.currentUser, new Date(), text)
    );
  }

  receivedMessage(data) {
    this.messageWidgets.push(
      new MessageWidget(this.messagesFeedElement, this, data)
    );
  }
}
