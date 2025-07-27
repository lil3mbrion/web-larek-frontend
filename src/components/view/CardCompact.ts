import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { IProduct } from "../../types/components/model/IProduct";

export class CardCompact implements IView {
  index: HTMLSpanElement;
  title: HTMLHeadingElement;
  price: HTMLSpanElement;
  deleteButton: HTMLButtonElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.title = container.querySelector(settings.cardCompactSettings.title) as HTMLHeadingElement;
    this.price = container.querySelector(settings.cardCompactSettings.price) as HTMLSpanElement;
    this.index = container.querySelector(settings.cardCompactSettings.index) as HTMLSpanElement;
    this.deleteButton = container.querySelector(settings.cardCompactSettings.deleteButton) as HTMLButtonElement;

    this.deleteButton.addEventListener('click', () => {
      this.events.emit('ui:basket-remove', { id: this.id })
    })
  }

  render(data: { product: IProduct, index: number }) {
    if (data) {
      this.id = data.product.id;
      this.title.textContent = data.product.title
      this.price.textContent = String(data.product.price)
      this.index.textContent = String(data.index);
    }

    return this.container;
  }
}