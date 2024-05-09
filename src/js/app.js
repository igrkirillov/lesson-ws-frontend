import TicketsWidget from "./TicketsWidget";

document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");
  new TicketsWidget(mainElement);
});
