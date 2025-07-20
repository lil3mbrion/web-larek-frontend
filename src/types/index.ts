type ProductCategory = "софт-скил" | "другое" | "хард-скил" | "дополнительное" | "кнопка";

type Payment =  "online" | "offline";

interface IOrderResponse  {
  id: string;
  total: number;
}

interface IBasketModel {
  items: Map<string ,IProduct>;
  add(id: string): void;
  remove(id: string): void
}

type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number | null;
}

interface IOrder {
  payment: Payment;       
  email: string;   
  phone: string;   
  address: string;       
  total: number;             
  items: string[]
}

type Contacts = {
  email: string;   
  phone: string; 
}

type locationPayment = {
  payment: Payment;
  adress: string;
}

interface IWebApi {
  getProducts: () => Promise<{ total: number; items: IProduct[] }>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: IOrder) => Promise<IOrderResponse>;
}

enum AppModal {
	productDetails = 'modal:product',
  basket = 'modal:basket',
  orderForm = 'modal:order',
  contactsForm = 'modal:contacts',
  success = 'modal:success',
  none = 'modal:none'
}

enum AppStateEvent {
  productsLoaded = 'change:products',
  basketUpdated = 'change:basket',
  modalChanged = 'change:modal',
  orderProcessed = 'change:order',
  errorOccurred = 'change:error'
}

interface IAppModel {
  products: IProduct[];
  selectedProduct: IProduct;
  basket: Map<string, IProduct>;
  basketTotal: number;
  order: Partial<IOrder>;
  openedModal: AppModal;
  isReady: boolean;
  validationErrorMessage: string | null;
  getProducts: () => Promise<{ total: number; items: IProduct[] }>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: IOrder) => Promise<IOrderResponse>;
  selectProduct(id: string): void;
  selectPayment(selected: Payment): void;
  addProduct(id: string): void;
  removeProduct(id: string): void;
  clearBasket(): void;
  fillOrder(info: locationPayment): void;
  fillContacts(contacts: Contacts): void;
  isValidForm(): boolean;
  openModal(modal: AppModal): void;
  closeModal(): void;
}

// UI

interface CardFullSettings {
  description: string;
  image: string;
  addButton: HTMLButtonElement;
  title: string;
  category: ProductCategory;
  price: number | null;
  fullClass: string;
  isFull: boolean;
}

interface CardCompactSettings {
  title: string;
  index: number;
  price: number | null;
  compactClass: string;
  isCompact: boolean;
  deleteButton: HTMLButtonElement;
}

interface CardCatalogSettings {
  image: string;
  title: string;
  category: ProductCategory;  
  price: number | null;
}

interface BasketSettings {
  modalTitle: string;
  itemListContainer: HTMLUListElement;
  itemList: Map<string, CardCompactSettings>;
  totalPrice: number;
  button: HTMLButtonElement;
}

interface ModalSettings<T> {
  content: T;
  closeButton: HTMLButtonElement;
  activeClass: string;
  isActive: boolean;
}

interface OrderSettings {
  modalTitle: string;
  onlineButton: HTMLButtonElement;
  offlineButton: HTMLButtonElement;
  adressLabel: string,
  adressInput: HTMLInputElement;
  orderButton: HTMLButtonElement;
  formErrors: string;
  isValid: boolean;
}

interface ContactsSettings{
  emailLabel: string;
  emailInput: HTMLInputElement;
  phoneLabel: string;
  phoneInput:HTMLInputElement;
  button: HTMLButtonElement;
  formErrors: string;
  isValid: boolean;
}

interface SuccessSettings {
  title: string;
  description: string;
  button: HTMLButtonElement;
}






