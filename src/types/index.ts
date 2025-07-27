export type ProductCategory = "софт-скил" | "другое" | "хард-скил" | "дополнительное" | "кнопка";

export type Payment =  "online" | "offline";

export type Contacts = {
  email: string;   
  phone: string; 
}

export type LocationPayment = {
  payment: Payment;
  address: string;
}

export enum AppModal {
	productDetails = 'modal:product',
  basket = 'modal:basket',
  orderForm = 'modal:order',
  contactsForm = 'modal:contacts',
  success = 'modal:success',
  none = 'modal:none'
}

export enum AppStateEvent {
  basketUpdated = 'change:basket',
  modalChanged = 'change:modal',
  orderValidationChanged = 'change:order-validation',
  contactsValidationChanged = 'change:contacts-validation'
}