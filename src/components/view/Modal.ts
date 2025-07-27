import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";

export class Modal implements IView {
  content: HTMLDivElement;
  closeButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    if (!container) {
      throw new Error('Modal container element not found');
  }
    this.content = container.querySelector(settings.modalSettings.content);
    this.closeButton = container.querySelector(settings.modalSettings.closeButton);

    this.closeButton.addEventListener('click', () => {
      if (this.container.querySelector(settings.successSettings.button)) {
        this.events.emit('ui:success-close-modal', {});
      } else {
        this.events.emit('ui:close-modal', {});
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        if (this.container.querySelector(settings.successSettings.button)) {
          this.events.emit('ui:success-close-modal', {});
        } else {
          this.events.emit('ui:close-modal', {});
        }
      }
    })  
  }

  open() {
    this.container.classList.add(settings.modalSettings.activeClass);
    document.body.classList.add('body-lock');
  }

  close() {
    this.container.classList.remove(settings.modalSettings.activeClass);
    document.body.classList.remove('body-lock');
  }

  render(data: HTMLElement) {
    this.content.replaceChildren('');
    if (data) {
      this.content.replaceChildren(data)
    }
    return this.container;
  }
}
