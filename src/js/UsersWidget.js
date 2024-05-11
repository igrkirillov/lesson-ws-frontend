import UserWidget from "./UserWidget";

export default class UsersWidget {
  constructor(ownerElement, chatWidget) {
    this.element = this.createElement(ownerElement);
    this.userWidgets = [];
    this.chatWidget = chatWidget;
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("users");
    ownerElement.appendChild(element);
    return element;
  }

  reload(userArray) {
    this.clearFromRemovedUsers(userArray);
    this.createWidgetsForNewUsers(userArray);
  }

  clearFromRemovedUsers(userArray) {
    const idSet = new Set(userArray.map(user => user.id));
    const userWidgetsForRemoving = this.userWidgets.filter(userWidget => !idSet.has(userWidget.user.id));
    userWidgetsForRemoving.forEach(userWidget => userWidget.remove());
    this.userWidgets = this.userWidgets.filter(userWidget => idSet.has(userWidget.user.id));
  }

  createWidgetsForNewUsers(userArray) {
    const idExistsSet = new Set(this.userWidgets.map(userWidget => userWidget.user.id));
    const usersForCreating = userArray.filter(user => !idExistsSet.has(user.id));
    for (const user of usersForCreating) {
      const userWidget = new UserWidget(this.element, user);
      this.userWidgets.push(userWidget);
    }
  }
}
