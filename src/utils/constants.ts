export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  gallerySelector: '.gallery',
  cardFullTemplate: '#card-preview',
  cardFullSettings: {
    image: ".card__image",
    category: ".card__category",
    title: ".card__title",
    description: ".card__text",
    price: ".card__price",
    addButon: ".card__button",
    fullClass: ".card_full"
  },
  cardCompactTemplate: '#card-basket',
  cardCompactSettings: {
    index: ".basket__item-index",
    title: ".card__title",
    price: ".card__price",
    deleteButton: ".basket__item-delete",
    compactClass: ".card_compact"
  },
  cardCatalogTemplate: '#card-catalog',
  cardCatalogSettings: {
    image: ".card__image",
    category: ".card__category",
    title: ".card__title",
    price: ".card__price",
    openButton: ".gallery__item"
  },
  basketTemplate: '#basket',
  basketSettings: {
    modalTitle: ".modal__title",
    itemListContainer: ".basket__list",
    itemList: ['li', { className: 'basket__item' }],
    basketButton: ".button",
    totalPrice: ".basket__price"
  },
  orderTemplate: '#order',
  orderTemplateSettings: {
    modalTitle: ".modal__title",
    onlineButton: ".button-card",
    offlineButton: ".button-cash",
    adressLabel: ".form__label",
    adressInput: ".form__input",
    orderButton: ".order__button",
    formErrors: ".form__errors"
  },
  contactsTemplate: '#contacts',
  contactsSettings: {
    emailLabel: ".form__label",
    emailInput: ".input__email",
    phoneLabel: ".form__label",
    phoneInput: ".input__phone",
    button: ".button",
    formErrors: ".form__errors"
  },
  successTemplate: '#success',
  successSettings: {
    title: ".order-success__title",
    description: ".order-success__description",
    button: ".order-success__close"
  },
  modalContainer: '#modal-container',
  modalSettings: {
    closeButton: ".modal__close",
    content: ".modal__content",
    activeClass: "modal_active"
  },
  pageContainer: ".page",
  pageSettings: {
    logoImage: ".header__logo-image",
    basketButton: ".header__basket",
    catalog: ".gallery",
    basketCounter: ".header__basket-counter"
  }
};
