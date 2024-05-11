import ChatWidget from "./ChatWidget";
import EnterDialogWidget from "./EnterDialogWidget";
import { createNewUserOnServer } from "./serverApi";
import SpinnerDialogWidget from "./SpinnerDialogWidget";

let mainElement;
let spinnerDialog;
let chatWidget;

document.addEventListener("DOMContentLoaded", () => {
  mainElement = document.querySelector("main");
  new EnterDialogWidget(mainElement, createChat);
});

function createChat(userName) {
  spinnerDialog = new SpinnerDialogWidget(mainElement);
  createNewUserOnServer(userName)
    .then((user) => {
      chatWidget = new ChatWidget(mainElement, user);
    })
    .catch((e) => processError(e.message))
    .finally(() => {
      if (spinnerDialog && !spinnerDialog.isClosed()) {
        spinnerDialog.close();
        if (chatWidget) {
          chatWidget.setFocus();
        }
      }
    })
}

function processError(errorText) {
  alert(errorText);
  new EnterDialogWidget(mainElement, createChat);
}
