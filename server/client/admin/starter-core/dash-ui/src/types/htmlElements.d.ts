declare interface HTMLButtonElementClickEvent extends Event {
  target: HTMLButtonElement
}

declare interface HTMLAnchorElementClickEvent extends Event {
  target: HTMLAnchorElement
}

declare interface InputTextEvent extends Event {
  target: HTMLInputElement;
}

declare interface InputSelectEvent extends Event {
  target: HTMLSelectElement;
}
