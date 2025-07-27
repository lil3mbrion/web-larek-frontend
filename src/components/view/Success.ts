import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";

export class Success implements IView {
  title: HTMLHeadingElement;
  description: HTMLParagraphElement;
  button: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.title = container.querySelector(settings.successSettings.title) as HTMLHeadingElement;
    this.description = container.querySelector(settings.successSettings.description) as HTMLParagraphElement;
    this.button = container.querySelector(settings.successSettings.button) as HTMLButtonElement;

    this.button.addEventListener('click', () => {
      this.events.emit('ui:success-close-modal', {});
    });
  }

  render(data: { description: string}) {
    if (data) {
      this.description.textContent = data.description;
    }
    return this.container;
  }
}