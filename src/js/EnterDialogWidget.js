export default class EnterDialogWidget {
  constructor(ownerElement, callback) {
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement);
    this.callback = callback;
    this.addListeners();
    this.setFocus();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("enter-dialog-base");
    element.innerHTML = `
    <div class="enter-dialog">
      <div class="enter-dialog-title">
          Вход в чат. Введите своё имя:
      </div>
      <div class="enter-dialog-container">
          <div class="enter-dialog-message">
              <input type="text" class="enter-dialog-username">
          </div>
          <div class="enter-dialog-buttons">              
              <input class="enter-dialog-ok" type="submit" value="Войти в чат">
          </div>
      </div>
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  get nameElement() {
    return this.element.querySelector(".enter-dialog-username");
  }

  get okButtonElement() {
    return this.element.querySelector(".enter-dialog-ok");
  }

  addListeners() {
    this.onClickOk = this.onClickOk.bind(this);
    this.onNameKeyDown = this.onNameKeyDown.bind(this);
    this.okButtonElement.addEventListener("click", this.onClickOk);
    this.nameElement.addEventListener("keydown", this.onNameKeyDown);
  }

  onClickOk() {
    this.callback(this.nameElement.value);
    this.close();
  }

  onNameKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.callback(this.nameElement.value);
      this.close();
    }
  }

  close() {
    const okButtonElement = this.element.querySelector(".enter-dialog-ok");
    okButtonElement.removeEventListener("click", this.onClickOk);
    this.ownerElement.removeChild(this.element);
  }

  setFocus() {
    this.nameElement.focus();
  }
}
