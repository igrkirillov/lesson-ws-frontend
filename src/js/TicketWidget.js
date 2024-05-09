import {
  deleteByIdOnServer,
  ticketByIdFromServer,
  updateByIdOnServer,
} from "./serverApi";
import TicketDialogWidget from "./TicketDialogWidget";
import { toRusFormatDate } from "./utils";
import YesNoDialogWidget from "./YesNoDialogWidget";

export default class TicketWidget {
  constructor(ticketsWidget, ownerElement, dto) {
    this.ticketsWidget = ticketsWidget;
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement, dto);
    this.dto = dto;
    this.addListeners();

    // для чекбокса нельзя установить значение через innerHtml
    this.getTicketStatusElement().checked = dto.status;
  }

  createElement(ownerElement, dto) {
    const element = document.createElement("div");
    element.classList.add("ticket");
    element.dataset.id = dto.id;
    element.innerHTML = `
        <div class="ticket-row">
          <label>
            <input type="checkbox" class="ticket-status visually-hidden"/>
            <div class="ticket-status-switch"></div>
          </label>
          <span class="ticket-name">
            ${dto.name}
          </span>
          <span class="ticket-datetime">
            ${toRusFormatDate(dto.created)}
          </span>
          <div class="ticket-toolbar">
            <a href="#" class="ticket-toolbar-element ticket-edit">&#128393;</a>
            <a href="#" class="ticket-toolbar-element ticket-remove">&#x2573;</a>
          </div>
        </div>
        <div class="ticket-description display-none">
        </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  onClickEdit(event) {
    event.stopPropagation();
    new TicketDialogWidget(
      this.ticketsWidget,
      this.ownerElement,
      this.dto.clone()
    );
  }

  onClickRemove(event) {
    event.stopPropagation();
    const widget = this;
    new YesNoDialogWidget(
      this.ownerElement,
      {
        title: "Удалить тикет",
        message:
          "Вы уверены, что хотите удалить тикет? Это действие необратимо.",
      },
      (answer) => {
        if (answer === "yes") {
          deleteByIdOnServer(widget.dto).then(() =>
            widget.ticketsWidget.removeTicketWidget(widget.dto)
          );
        }
      }
    );
  }

  onClickStatus(event) {
    event.stopPropagation();
    const widget = this;
    const tempDto = this.dto.clone();
    tempDto.status = this.getTicketStatusElement().checked;
    updateByIdOnServer(tempDto).then((dto) => {
      widget.dto = dto;
      widget.ticketsWidget.reloadTicketWidget(dto);
    });
  }

  onClickTicket() {
    if (this.getTicketDescriptionElement().classList.contains("display-none")) {
      this.showDescription();
    } else {
      this.hideDescription();
    }
  }

  showDescription() {
    const widget = this;
    ticketByIdFromServer(this.dto).then((dto) => {
      const descElement = widget.getTicketDescriptionElement();
      descElement.textContent = dto.description;
      descElement.classList.remove("display-none");
    });
  }

  hideDescription() {
    const descElement = this.getTicketDescriptionElement();
    descElement.textContent = "";
    descElement.classList.add("display-none");
  }

  getTicketEditElement() {
    return this.element.querySelector(".ticket-edit");
  }

  getTicketRemoveElement() {
    return this.element.querySelector(".ticket-remove");
  }

  getTicketStatusElement() {
    return this.element.querySelector(".ticket-status");
  }

  getTicketStatusLabelElement() {
    return this.element.querySelector(".ticket-status").closest("label");
  }

  getTicketNameElement() {
    return this.element.querySelector(".ticket-name");
  }

  getTicketDateTimeElement() {
    return this.element.querySelector(".ticket-datetime");
  }

  getTicketDescriptionElement() {
    return this.element.querySelector(".ticket-description");
  }

  addListeners() {
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onClickStatus = this.onClickStatus.bind(this);
    this.onClickTicket = this.onClickTicket.bind(this);

    this.getTicketEditElement().addEventListener("click", this.onClickEdit);
    this.getTicketRemoveElement().addEventListener("click", this.onClickRemove);
    this.getTicketStatusLabelElement().addEventListener(
      "click",
      this.onClickStatus
    );
    this.element.addEventListener("click", this.onClickTicket);
  }

  remove() {
    this.getTicketEditElement().removeEventListener("click", this.onClickEdit);
    this.getTicketRemoveElement().removeEventListener(
      "click",
      this.onClickRemove
    );
    this.getTicketStatusLabelElement().removeEventListener(
      "click",
      this.onClickStatus
    );
    this.element.removeEventListener("click", this.onClickTicket);
    this.ownerElement.removeChild(this.element);
  }

  reload() {
    const widget = this;
    ticketByIdFromServer(this.dto).then((dto) => {
      widget.dto = dto;
      widget.refreshFields();
    });
  }

  refreshFields() {
    this.getTicketStatusElement().value = this.dto.status;
    this.getTicketNameElement().textContent = this.dto.name;
    this.getTicketDateTimeElement().textContent = toRusFormatDate(
      this.dto.created
    );
    this.getTicketDescriptionElement().textContent = this.dto.description;
  }
}
