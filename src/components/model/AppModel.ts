import { IAppModel } from "../../types/components/model/IAppModel";
import { IProduct } from "../../types/components/model/IProduct";
import { IOrder } from "../../types/components/model/IOrder";
import { IWebApi } from "../../types/components/model/IWebApi";
import { AppModal, Payment, AppStateEvent, Contacts, LocationPayment } from "../../types/index";
import { IEvents } from "../base/events";
import { IOrderResponse } from "../../types/components/model/IOrderResponse";

export class AppModel implements IAppModel {
  products: IProduct[] = [];
  selectedProduct: IProduct = null;
  basket: IProduct[] = [];
  basketTotal: number = 0;
  order: Partial<IOrder> = {};
  openedModal: AppModal = null;
  validationErrorMessage: string | null = null;
  webApi: IWebApi;
  address: string = '';
  selectedPayment: Payment = null;
  phone: string = '';
  email: string = '';
  isOrderValid: boolean = false;
  isContactsValid: boolean = false;
  isBasketValid: boolean = false;

  constructor(webApi: IWebApi, protected events: IEvents) {
    this.webApi = webApi;
  }

  async getProducts(): Promise<{ total: number; items: IProduct[] }> {
    const response = await this.webApi.getProducts();
    this.products = response.items;
    return response;
  }

  async getProduct(id: string): Promise<IProduct> {
    this.selectedProduct = await this.webApi.getProduct(id);
    return this.selectedProduct;
  }

  async createOrder(order: IOrder): Promise<IOrderResponse> {
    return this.webApi.createOrder(order);
  }

  selectProduct(id: string): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.selectedProduct = product;
    }
  }

  isProductInBasket(id: string): boolean {
    return this.basket.some(item => item.id === id);
  }

  isBasketEmpty(): void {
    this.isBasketValid = this.basket.length > 0;
    this.events.emit(AppStateEvent.basketUpdated);
  }

  addItemsOrder() {
    this.order.items = this.basket.map(item => item.id);
    this.order.total = this.basketTotal;
  }

  addProduct(id: string): void {
    const product = this.products.find(p => p.id === id);
    if (product && !this.basket.some(p => p.id === id)) {
      this.basket.push(product);
      this.updateBasketTotal();
      this.events.emit(AppStateEvent.basketUpdated);
    }
  }

  removeProduct(id: string): void {
    this.basket = this.basket.filter(p => p.id !== id);
    this.updateBasketTotal();
    this.events.emit(AppStateEvent.basketUpdated);
  }

  clearBasket(): void {
    this.basket = [];
    this.basketTotal = 0;
  }

  updateBasketTotal(): void {
    this.basketTotal = this.basket.reduce((sum, product) => {
      return sum + (product.price || 0);
    }, 0);
  }

  fillOrder(info: LocationPayment): void {
    this.order = {...this.order, ...info }
  }

  fillContacts(contacts: Contacts): void {
    this.order = { ...this.order, ...contacts };
  }

  isValidOrderForm(): void {
    this.isOrderValid = Boolean((this.address !== '') && (this.selectedPayment !== null));
    this.validationErrorMessage = this.isOrderValid ? '' : 'Необходимо указать адрес и способ оплаты';
    this.events.emit(AppStateEvent.orderValidationChanged, { 
      isValid: this.isOrderValid,
      formErrors: this.validationErrorMessage 
    });
  }

  isValidContactsForm(): void {
    this.isContactsValid = Boolean((this.phone !== '') && (this.email !== ''));
    this.validationErrorMessage = this.isContactsValid ? '' : 'Необходимо указать номер телефона и email';
    this.events.emit(AppStateEvent.contactsValidationChanged, { 
      isValid: this.isContactsValid,
      formErrors: this.validationErrorMessage 
    });
  }

  setOpenedModal(modal: AppModal) {
    this.openedModal = modal;
    this.events.emit(AppStateEvent.modalChanged, { mod: modal });
  }

}