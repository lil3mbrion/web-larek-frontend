import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { IProduct } from "../../types/components/model/IProduct";
import { CDN_URL } from "../../utils/constants";

export class CardCatalog implements IView {
  image: HTMLImageElement;
  title: HTMLHeadingElement;
  category: HTMLSpanElement;
  price: HTMLSpanElement;
  openButton: HTMLButtonElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.image = container.querySelector(settings.cardCatalogSettings.image) as HTMLImageElement;
    this.title = container.querySelector(settings.cardCatalogSettings.title) as HTMLHeadingElement;
    this.category = container.querySelector(settings.cardCatalogSettings.category) as HTMLSpanElement;
    this.price = container.querySelector(settings.cardCatalogSettings.price) as HTMLSpanElement;
    
    this.container.addEventListener('click', () => {
      this.events.emit('ui:open-modal', { id: this.id })
    })
    
  }

  render(data: IProduct) {
    if (data) {
      this.id = data.id
      this.image.src = `${CDN_URL}${data.image}`
      this.title.textContent = data.title
      this.category.textContent = data.category
      this.price.textContent = data.price === null ? "Бесценно" : `${data.price} синапсов`;
    }

    return this.container;
  }
}