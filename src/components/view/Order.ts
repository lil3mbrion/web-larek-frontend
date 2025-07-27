import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";
import { Payment } from "../../types";

export class Order implements IView {
  modalTitle: HTMLHeadingElement;
  onlineButton: HTMLButtonElement;
  offlineButton: HTMLButtonElement;
  addressLabel: HTMLSpanElement;
  addressInput: HTMLInputElement;
  orderButton: HTMLButtonElement;
  formErrors: HTMLSpanElement;
  selectedPayment: Payment;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.modalTitle = container.querySelector(settings.orderTemplateSettings.modalTitle) as HTMLHeadingElement;
    this.onlineButton = container.querySelector(settings.orderTemplateSettings.onlineButton) as HTMLButtonElement;
    this.offlineButton = container.querySelector(settings.orderTemplateSettings.offlineButton) as HTMLButtonElement;
    this.addressLabel = container.querySelector(settings.orderTemplateSettings.adressLabel) as HTMLSpanElement;
    this.addressInput = container.querySelector(settings.orderTemplateSettings.adressInput) as HTMLInputElement;
    this.orderButton = container.querySelector(settings.orderTemplateSettings.orderButton) as HTMLButtonElement;
    this.formErrors = container.querySelector(settings.orderTemplateSettings.formErrors) as HTMLSpanElement;

    this.addressInput.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.events.emit('ui:address-input', { value: target.value });
      this.events.emit('ui:form-order-changed', {});
    });

    this.onlineButton.addEventListener('click', () => {
      this.setActiveButton(this.onlineButton);
      this.selectedPayment = "online";
      this.events.emit('ui:payment-changed', { payment: "online" });
      this.events.emit('ui:form-order-changed', {});
    });

    this.offlineButton.addEventListener('click', () => {
      this.setActiveButton(this.offlineButton);
      this.selectedPayment = "offline";
      this.events.emit('ui:payment-changed', { payment: "offline" });
      this.events.emit('ui:form-order-changed', {});
    });

    this.orderButton.addEventListener('click', () => {
      this.events.emit('ui:order-submit', {selected: this.selectedPayment, adress: this.addressInput.value})
    })
  }

  setActiveButton(activeButton: HTMLButtonElement): void {
    this.onlineButton.classList.remove('button_alt-active');
    this.offlineButton.classList.remove('button_alt-active');
    activeButton.classList.add('button_alt-active');
  }

  render(data: { isValid: boolean, formErrors: string }) {
    if (data) {
      this.formErrors.textContent = data.formErrors;
      this.orderButton.disabled = !data.isValid;
    }
    
    return this.container;
  }
}