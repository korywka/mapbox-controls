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
  }

  setText(text: string) {
    this.node.textContent = text;
  }

  onClick(callback: (event: MouseEvent) => void) {
    this.node.addEventListener('click', callback);
  }

  addClassName(className: string) {
    this.node.classList.add(className);
  }

  removeClassName(className: string) {
    this.node.classList.remove(className);
  }
}

export default Button;
