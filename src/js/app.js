import ChatWidget from "./ChatWidget";

document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");
  new ChatWidget(mainElement);
});
