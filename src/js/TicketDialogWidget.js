import { saveTicketOnServer, updateByIdOnServer } from "./serverApi";

export default class TicketDialogWidget {
  constructor(ticketsWidget, ownerElement, dto) {
    this.ticketsWidget = ticketsWidget;
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement, dto);
    this.dto = dto;
    this.addListeners();
    this.setFocus();
  }

  createElement(ownerElement, dto) {
    const element = document.createElement("div");
    element.classList.add("ticket-dialog-base");
    element.innerHTML = `
    <div class="ticket-dialog">
      <div class="ticket-dialog-title">
          ${dto.id ? "Редактирование тикета" : "Добавить тикет"}
      </div>
      <div class="ticket-dialog-container">
          <label for="name">Краткое описание</label>
          <input class="ticket-dialog-name" type="text" name="name" value="${
            dto.name || ""
          }">
          <label for="description">Подробное описание</label>
          <textarea class="ticket-dialog-description" name="description">${
            dto.description || ""
          }</textarea>
          <div class="ticket-dialog-buttons">
              <input class="ticket-dialog-cancel" type="submit" value="Отмена">
              <input class="ticket-dialog-ok" type="submit" value="Ок">
          </div>
      </div>
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  addListeners() {
    this.onClickOk = this.onClickOk.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    const okButtonElement = this.element.querySelector(".ticket-dialog-ok");
    const cancelButtonElement = this.element.querySelector(
      ".ticket-dialog-cancel"
    );

    okButtonElement.addEventListener("click", this.onClickOk);
    cancelButtonElement.addEventListener("click", this.onClickCancel);
  }

  setFocus() {
    this.getNameElement().focus();
  }

  getNameElement() {
    return this.element.querySelector(".ticket-dialog-name");
  }

  getDescriptionElement() {
    return this.element.querySelector(".ticket-dialog-description");
  }

  onClickOk() {
    this.dto.name = this.getNameElement().value;
    this.dto.description = this.getDescriptionElement().value;
    const dialogWidget = this;
    if (this.dto.id) {
      updateByIdOnServer(this.dto)
        .then((dto) => dialogWidget.ticketsWidget.reloadTicketWidget(dto))
        .then(() => dialogWidget.close());
    } else {
      saveTicketOnServer(this.dto)
        .then((dto) => dialogWidget.ticketsWidget.addTicketWidget(dto))
        .then(() => dialogWidget.close());
    }
  }

  onClickCancel() {
    this.close();
  }

  close() {
    const okButtonElement = this.element.querySelector(".ticket-dialog-ok");
    const cancelButtonElement = this.element.querySelector(
      ".ticket-dialog-cancel"
    );

    okButtonElement.removeEventListener("click", this.onClickOk);
    cancelButtonElement.removeEventListener("click", this.onClickCancel);

    this.ownerElement.removeChild(this.element);
  }
}
