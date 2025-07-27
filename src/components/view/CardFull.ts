import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { IProduct } from "../../types/components/model/IProduct";
import { CDN_URL } from "../../utils/constants";
import { AppModel } from "../model/AppModel";

export class CardFull implements IView {
  description: HTMLParagraphElement;
  image: HTMLImageElement;
  addButton: HTMLButtonElement;
  title: HTMLHeadingElement;
  category: HTMLSpanElement;
  price: HTMLSpanElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events: IEvents, protected appModel: AppModel) {
    this.description = container.querySelector(settings.cardFullSettings.description) as HTMLParagraphElement;
    this.image = container.querySelector(settings.cardFullSettings.image) as HTMLImageElement;
    this.addButton = container.querySelector(settings.cardFullSettings.addButon) as HTMLButtonElement;
    this.title = container.querySelector(settings.cardFullSettings.title) as HTMLHeadingElement;
    this.category = container.querySelector(settings.cardFullSettings.category) as HTMLSpanElement;
    this.price = container.querySelector(settings.cardFullSettings.price) as HTMLSpanElement;

    this.addButton.addEventListener('click', () => {
      if (this.appModel.isProductInBasket(this.id)) {
        this.events.emit('ui:basket-remove', { id: this.id });
      } else {
        this.events.emit('ui:basket-add', { id: this.id });
      }
    });
  }

  updateButtonState(): void {
    if (this.id) {
      const product = this.appModel.products.find(p => p.id === this.id);
      const inBasket = this.appModel.isProductInBasket(this.id);
      
      if (product.price === null) {
        this.addButton.disabled = true;
        this.addButton.textContent = 'Недоступно';
      } else {
        this.addButton.disabled = false;
        this.addButton.textContent = inBasket ? 'Убрать из корзины' : 'В корзину';
      }
    }
  }

  render(data: IProduct) {
    if (data) {
      this.id = data.id
      this.description.textContent = data.description
      this.image.src = `${CDN_URL}${data.image}`
      this.title.textContent = data.title
      this.category.textContent = data.category
      this.price.textContent = data.price === null ? "Бесценно" : `${data.price} синапсов`
      this.updateButtonState();
    }

    return this.container;
  }
}