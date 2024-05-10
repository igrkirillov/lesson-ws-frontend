import MessageWidget from "./MessageWidget";

export default class MessagesWidget {
  constructor(ownerElement, chatWidget) {
    this.element = this.createElement(ownerElement);
    this.messageWidgets = [];
    this.chatWidget = chatWidget;

    this.messageWidgets.push(new MessageWidget(this.messagesFeedElement, this, {
      text: "111111",
      dateTime: new Date(),
      user: {
        name: "Alexandra",
        id: 1
      }
    }));
    this.messageWidgets.push(new MessageWidget(this.messagesFeedElement, this, {
      text: "22222",
      dateTime: new Date(),
      user: {
        name: "Ivan",
        id: 2
      }
    }));
    this.messageWidgets.push(new MessageWidget(this.messagesFeedElement, this, {
      text: "444444",
      dateTime: new Date(),
      user: {
        name: "You",
        id: 4
      }
    }));
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

  get messagesFeedElement() {
    return this.element.querySelector(".messages-feed");
  }

  get currentUser() {
    return this.chatWidget.currentUser;
  }
}
