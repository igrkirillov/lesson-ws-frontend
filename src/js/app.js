import ChatWidget from "./ChatWidget";
import EnterDialogWidget from "./EnterDialogWidget";
import {createNewUserOnServer} from "./serverApi";

let mainElement;

document.addEventListener("DOMContentLoaded", () => {
  mainElement = document.querySelector("main");
  new EnterDialogWidget(mainElement, createChat);
});

function createChat(userName) {
  createNewUserOnServer(userName).then(user => {
    console.dir(user);
    new ChatWidget(mainElement, user);
  });
}
