import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { IProduct } from "../../types/components/model/IProduct";
import { cloneTemplate } from "../../utils/utils";
import { CardCompact } from "./CardCompact";

export class BasketView implements IView {
  modalTitle: HTMLHeadingElement;
  itemListContainer: HTMLUListElement;
  totalPrice: HTMLSpanElement;
  button: HTMLButtonElement;
  emptyMessage: HTMLLIElement;

  constructor(protected container: HTMLElement, protected events: IEvents, protected cardCompact: CardCompact) {
    this.emptyMessage = document.createElement('li');
    this.emptyMessage.className = 'basket__empty-message';
    this.emptyMessage.textContent = 'Корзина пуста';
    this.modalTitle = container.querySelector(settings.basketSettings.modalTitle) as HTMLHeadingElement;
    this.itemListContainer = container.querySelector(settings.basketSettings.itemListContainer) as HTMLUListElement;
    this.totalPrice = container.querySelector(settings.basketSettings.totalPrice) as HTMLSpanElement;
    this.button = container.querySelector(settings.basketSettings.basketButton) as HTMLButtonElement;
    if (this.button) {
      this.button.addEventListener('click', () => {
        this.events.emit('ui:basket-buy', {})
      })
    }
  }

  render(data: { items: IProduct[] }): HTMLElement {
    if (!data?.items) return this.container;
    
    this.itemListContainer.innerHTML = '';
    
    if (data.items.length === 0) {
      
      this.itemListContainer.appendChild(this.emptyMessage);
      
      this.button.disabled = true;
    } else {
      
      data.items.forEach((product, index) => {
        this.itemListContainer.appendChild(this.cardCompact.render({ 
          product, 
          index: index + 1 
        }));
      }); 
      this.button.disabled = false;
    }

    const total = data.items.reduce((sum, product) => sum + (product.price || 0), 0);
    this.totalPrice.textContent = `${total} синапсов`;
    
    return this.container;
  }
}