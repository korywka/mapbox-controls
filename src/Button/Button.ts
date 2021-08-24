class Button {
  node: HTMLButtonElement
  icon: SVGElement

  constructor() {
    this.node = document.createElement('button');
    this.node.type = 'button';
    this.icon = null;
  }

  setIcon(icon: SVGElement) {
    this.icon = icon;
    this.node.appendChild(icon);
    return this;
  }

  setText(text: string) {
    this.node.textContent = text;
    return this;
  }

  setDisabled(isDisabled: boolean) {
    this.node.disabled = isDisabled;
    return this;
  }

  setActive(isActive: boolean) {
    if (isActive) {
      this.addClassName('-active');
    } else {
      this.removeClassName('-active');
    }
  }

  isActive() {
    return this.node.classList.contains('-active');
  }

  onClick(callback: (event: MouseEvent) => void) {
    this.node.addEventListener('click', callback);
  }

  addClassName(className: string) {
    this.node.classList.add(className);
    return this;
  }

  removeClassName(className: string) {
    this.node.classList.remove(className);
    return this;
  }
}

export default Button;
