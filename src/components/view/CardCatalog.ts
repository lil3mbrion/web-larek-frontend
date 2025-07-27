import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { IProduct } from "../../types/components/model/IProduct";
import { CDN_URL } from "../../utils/constants";

export class CardCatalog {
  image: HTMLImageElement;
  title: HTMLHeadingElement;
  category: HTMLSpanElement;
  price: HTMLSpanElement;
  openButton: HTMLButtonElement;

  protected id: string | null = null;
  constructor(protected events: IEvents) {}

  render(container: HTMLElement, data: IProduct) {
    const image = container.querySelector(settings.cardCatalogSettings.image) as HTMLImageElement;
      const title = container.querySelector(settings.cardCatalogSettings.title) as HTMLHeadingElement;
      const category = container.querySelector(settings.cardCatalogSettings.category) as HTMLSpanElement;
      const price = container.querySelector(settings.cardCatalogSettings.price) as HTMLSpanElement;
      image.src = `${CDN_URL}${data.image}`;
      title.textContent = data.title;
      category.textContent = data.category;
      price.textContent = data.price === null ? "Бесценно" : `${data.price} синапсов`;
      container.addEventListener('click', () => {
          this.events.emit('ui:open-modal', { id: data.id });
      });
      return container;
  }
}