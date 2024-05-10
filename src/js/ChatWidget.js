export default class ChatWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
    this.addListeners();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("tickets");
    element.innerHTML = `
    <div class="tickets-toolbar">
        <input type="button" class="tickets-add" value="Добавить тикет">
    </div>
    <div class="tickets-container">
        
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  addListeners() {
  }

}
