export default class YesNoDialogWidget {
  constructor(ownerElement, options, callback) {
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement, options || {});
    this.value = "no";
    this.callback = callback;
    this.addListeners();
  }

  createElement(ownerElement, options) {
    const element = document.createElement("div");
    element.classList.add("yesno-dialog-base");
    element.innerHTML = `
    <div class="yesno-dialog">
      <div class="yesno-dialog-title">
          ${options.title}
      </div>
      <div class="yesno-dialog-container">
          <div class="yesno-dialog-message">${options.message}</div>
          <div class="yesno-dialog-buttons">
              <input class="yesno-dialog-cancel" type="submit" value="Отмена">
              <input class="yesno-dialog-ok" type="submit" value="Ок">
          </div>
      </div>
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  addListeners() {
    this.onClickOk = this.onClickOk.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    const okButtonElement = this.element.querySelector(".yesno-dialog-ok");
    const cancelButtonElement = this.element.querySelector(
      ".yesno-dialog-cancel"
    );

    okButtonElement.addEventListener("click", this.onClickOk);
    cancelButtonElement.addEventListener("click", this.onClickCancel);
  }

  onClickOk() {
    this.value = "yes";
    this.callback(this.value);
    this.close();
  }

  onClickCancel() {
    this.value = "no";
    this.callback(this.value);
    this.close();
  }

  close() {
    const okButtonElement = this.element.querySelector(".yesno-dialog-ok");
    const cancelButtonElement = this.element.querySelector(
      ".yesno-dialog-cancel"
    );

    okButtonElement.removeEventListener("click", this.onClickOk);
    cancelButtonElement.removeEventListener("click", this.onClickCancel);

    this.ownerElement.removeChild(this.element);
  }
}
