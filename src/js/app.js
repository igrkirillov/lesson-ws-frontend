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
    new ChatWidget(mainElement, user);
  }).catch(e => processError(e.message));
}

function processError(errorText) {
  alert(errorText);
  new EnterDialogWidget(mainElement, createChat);
}
