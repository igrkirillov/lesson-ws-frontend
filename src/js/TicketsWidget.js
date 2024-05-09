import { allTicketsFromServer } from "./serverApi";
import TicketWidget from "./TicketWidget";
import TicketDialogWidget from "./TicketDialogWidget";
import Ticket from "./Ticket";

export default class TicketsWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
    this.ticketWidgets = [];
    this.addListeners();
    this.loadTickets();
    this.ticketsContainerElement =
      this.element.querySelector(".tickets-container");
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
    const ticketsAddElement = this.element.querySelector(".tickets-add");
    ticketsAddElement.addEventListener(
      "click",
      this.onClickAddTicket.bind(this)
    );
  }

  onClickAddTicket() {
    new TicketDialogWidget(this, this.element, new Ticket());
  }

  loadTickets() {
    const ticketsWidget = this;
    allTicketsFromServer().then((ticketDtoArray) => {
      ticketDtoArray.forEach((dto) => ticketsWidget.addTicketWidget(dto));
    });
  }

  addTicketWidget(dto) {
    const ticketWidget = new TicketWidget(
      this,
      this.ticketsContainerElement,
      dto
    );
    this.ticketWidgets.push(ticketWidget);
  }

  reloadTicketWidget(dto) {
    const ticketWidget = this.ticketWidgets.find((w) => w.dto.id === dto.id);
    if (ticketWidget) {
      ticketWidget.reload();
    }
  }

  removeTicketWidget(dto) {
    const ticketWidget = this.ticketWidgets.find((w) => w.dto.id === dto.id);
    if (ticketWidget) {
      ticketWidget.remove();
    }
  }
}
