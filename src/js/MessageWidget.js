export default class MessageWidget {
  constructor(ownerElement, messagesWidget, data) {
    this.element = this.createElement(ownerElement, messagesWidget, data);
    this.messagesWidget = messagesWidget;
    this.data = data;
  }

  createElement(ownerElement, messagesWidget, data) {
    const element = document.createElement("div");
    element.classList.add("message");
    if (data.user.id === messagesWidget.currentUser.id) {
      element.classList.add("message-own");
    } else {
      element.classList.add("message-another");
    }
    element.innerHTML = `
        <div class="message-container">
            <div class="message-title">
                <span>${data.user.name}</span>
                <span>${data.dateTime.toLocaleDateString()}</span>
            </div>
            <div class="message-content">
                <span>${data.text}</span>
            </div>
        </div>
    `;
    ownerElement.appendChild(element);
    return element;
  }
}
