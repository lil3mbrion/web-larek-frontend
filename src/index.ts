import './scss/styles.scss';
import { IEvents, EventEmitter } from "./components/base/events";
import { settings, API_URL  } from "./utils/constants";
import { WebApi } from './components/model/WebApi';
import { AppModal, AppStateEvent, Payment } from './types';
import { AppModel } from './components/model/AppModel';
import { CardFull } from './components/view/CardFull';
import { BasketView } from './components/view/BasketView';
import { Order } from './components/view/Order';
import { Contact } from './components/view/Contact';
import { Success } from './components/view/Success';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { cloneTemplate } from './utils/utils';
import { CardCompact } from './components/view/CardCompact';
import { CardCatalog } from './components/view/CardCatalog';

const webApi = new WebApi(API_URL);
const eventEmitter = new EventEmitter();
const appModel = new AppModel(webApi, eventEmitter);
const cardFull = new CardFull(cloneTemplate(settings.cardFullTemplate), eventEmitter, appModel);
const cardCompact = new CardCompact(cloneTemplate(settings.cardCompactTemplate), eventEmitter);
const cardCatalog = new CardCatalog(eventEmitter);
const basketView = new BasketView(cloneTemplate(settings.basketTemplate), eventEmitter, cardCompact);
const order = new Order(cloneTemplate(settings.orderTemplate), eventEmitter);
const contacts = new Contact(cloneTemplate(settings.contactsTemplate), eventEmitter);
const success = new Success(cloneTemplate(settings.successTemplate), eventEmitter);
const page = new Page(document.querySelector(settings.pageContainer), eventEmitter, appModel, cardCatalog);
const modalContainer = document.querySelector(settings.modalContainer) as HTMLElement;
const modal = new Modal(modalContainer, eventEmitter);

eventEmitter.on(AppStateEvent.modalChanged, (event: { mod: AppModal }) => {
  if (event.mod !== AppModal.none) {
    modal.open()
  } else {
    modal.close();
  }
});

eventEmitter.on('ui:open-modal', async (event: { id: string }) => {
  const product = await webApi.getProduct(event.id);
  appModel.selectProduct(event.id);
  modal.render(cardFull.render(product));
  appModel.setOpenedModal(AppModal.productDetails);
  cardFull.updateButtonState();
})

eventEmitter.on('ui:basket-open', () => {
  appModel.isBasketEmpty();
  modal.render(basketView.render({ items: appModel.basket }));
  appModel.setOpenedModal(AppModal.basket);
});

eventEmitter.on(AppStateEvent.basketUpdated, () => {
  page.updateBasketCounter(appModel.basket.length);
  if (appModel.openedModal === AppModal.basket) {
    basketView.render({ items: appModel.basket });
  }
});

eventEmitter.on('ui:close-modal', () => {
  if (appModel.openedModal !== AppModal.success) {
    appModel.setOpenedModal(AppModal.none);
  }
})

eventEmitter.on('ui:success-close-modal', () => {
  appModel.clearBasket();
  appModel.setOpenedModal(AppModal.none);
  page.render({ basketCount: 0 });
});

eventEmitter.on('ui:basket-add', (event: { id: string }) => {
  if (!appModel.isProductInBasket(event.id)) {
    appModel.addProduct(event.id);
    appModel.isBasketEmpty();
    cardFull.updateButtonState();
  }
})

eventEmitter.on('ui:basket-remove', (event: { id: string }) => {
  appModel.removeProduct(event.id);
  appModel.isBasketEmpty();
  cardFull.updateButtonState();
})

eventEmitter.on('ui:basket-buy', () => {
  appModel.addItemsOrder();
  order.onlineButton.classList.remove('button_alt-active');
  order.offlineButton.classList.remove('button_alt-active');
  appModel.selectedPayment = null;
  appModel.address = '';
  modal.render(order.render({
    isValid: false,
    formErrors: ''
  }));
  appModel.setOpenedModal(AppModal.orderForm);
})

eventEmitter.on('ui:payment-changed', (event: { payment: Payment }) => {
  appModel.selectedPayment = event.payment;
  appModel.isValidOrderForm();
});

eventEmitter.on('ui:address-input', (event: { value: string }) => {
  appModel.address = event.value;
  appModel.isValidOrderForm();
});

eventEmitter.on('ui:phone-input', (event: { value: string }) => {
  appModel.phone = event.value;
  appModel.isValidContactsForm();
});

eventEmitter.on('ui:email-input', (event: { value: string }) => {
  appModel.email = event.value;
  appModel.isValidContactsForm();
});

eventEmitter.on(AppStateEvent.orderValidationChanged, (event: { isValid: boolean; formErrors: string }) => {
  order.render(event);
});

eventEmitter.on(AppStateEvent.contactsValidationChanged, (event: { isValid: boolean; formErrors: string }) => {
  contacts.render(event);
});

eventEmitter.on('ui:order-submit', (event: {selected: Payment , adress: string}) => {
  appModel.fillOrder({payment: event.selected, address: event.adress});
  appModel.email = '';
  appModel.phone = '';
  modal.render(contacts.render({
    isValid: false,
    formErrors: '',
  }));
  appModel.setOpenedModal(AppModal.contactsForm);
})

eventEmitter.on('ui:contacts-submit', (event: { email: string, phone: string }) => {
  appModel.fillContacts({email: event.email, phone: event.phone});
  modal.render(success.render({
    description: `Списано ${appModel.basketTotal}синапсов`
  }))
  appModel.setOpenedModal(AppModal.success);
  appModel.createOrder(appModel.order)
    .catch((err) => {
      console.error(err)
    })
})

eventEmitter.on('ui:success-submit', () => {
  appModel.clearBasket();
  appModel.setOpenedModal(AppModal.none);
  page.render({ basketCount: 0 })
})

webApi.getProducts()
  .then((res) => {
    appModel.products = res.items;
    page.addCatalogCards(res.items); 
  })
  .catch(err => console.error('Ошибка загрузки:', err));




