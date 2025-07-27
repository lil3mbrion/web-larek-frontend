import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { AppStateEvent } from "../../types";
import { IProduct } from "../../types/components/model/IProduct";
import { CardCatalog } from "./CardCatalog";
import { AppModel } from "../model/AppModel";

export class Page implements IView {
  logoimage: HTMLImageElement;
  basketButton: HTMLButtonElement;
  catalog: HTMLElement;
  basketCounter: HTMLSpanElement;

  constructor(protected container: HTMLElement, protected events: IEvents, protected appModel: AppModel) {
    this.logoimage = container.querySelector(settings.pageSettings.logoImage) as HTMLImageElement;
    this.basketButton = container.querySelector(settings.pageSettings.basketButton) as HTMLButtonElement;
    this.catalog = container.querySelector(settings.pageSettings.catalog) as HTMLElement;
    this.basketCounter = container.querySelector(settings.pageSettings.basketCounter) as HTMLSpanElement;
  
    this.basketButton.addEventListener('click', () => {
      this.events.emit('ui:basket-open', {})
    })

    this.events.on(AppStateEvent.basketUpdated, () => {
      this.updateBasketCounter(this.appModel.basket.length );
    });
  }

  updateBasketCounter(count: number): void {
    this.basketCounter.textContent = String(count);
  }
  
  addCatalogCards(products: IProduct[]): void {
    const template = document.querySelector(settings.cardCatalogTemplate) as HTMLTemplateElement;
    products.forEach(product => {
      const cardElement = template.content.cloneNode(true) as DocumentFragment;
      const cardContainer = cardElement.firstElementChild as HTMLElement;
      const card = new CardCatalog(cardContainer, this.events);
      this.catalog.appendChild(card.render(product));
    })
  }

  render(data: {basketCount: number}) {
    if (data) {
      this.updateBasketCounter(data.basketCount)
    }
    return this.container;
  }
}