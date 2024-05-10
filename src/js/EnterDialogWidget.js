export default class EnterDialogWidget {
  constructor(ownerElement, callback) {
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement);
    this.callback = callback;
    this.addListeners();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("enter-dialog-base");
    element.innerHTML = `
    <div class="enter-dialog">
      <div class="enter-dialog-title">
          Вход в чат. Введите своё имя.
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

  addListeners() {
    this.onClickOk = this.onClickOk.bind(this);
    const okButtonElement = this.element.querySelector(".enter-dialog-ok");
    okButtonElement.addEventListener("click", this.onClickOk);
  }

  onClickOk() {
    this.callback(this.nameElement.value);
    this.close();
  }

  close() {
    const okButtonElement = this.element.querySelector(".enter-dialog-ok");
    okButtonElement.removeEventListener("click", this.onClickOk);
    this.ownerElement.removeChild(this.element);
  }
}
