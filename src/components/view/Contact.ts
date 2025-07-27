import { IView } from "../../types/components/base/IView";
import { IEvents } from "../base/events";
import { settings } from "../../utils/constants";

export class Contact implements IView {
  emailLabel: HTMLSpanElement;
  emailInput: HTMLInputElement;
  phoneLabel: HTMLSpanElement;
  phoneInput:HTMLInputElement;
  button: HTMLButtonElement;
  formErrors: HTMLSpanElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.emailLabel = container.querySelector(settings.contactsSettings.emailLabel) as HTMLSpanElement;
    this.emailInput = container.querySelector(settings.contactsSettings.emailInput) as HTMLInputElement;
    this.phoneLabel = container.querySelector(settings.contactsSettings.phoneLabel) as HTMLSpanElement;
    this.phoneInput = container.querySelector(settings.contactsSettings.phoneInput) as HTMLInputElement;
    this.button = container.querySelector(settings.contactsSettings.button) as HTMLButtonElement;
    this.formErrors = container.querySelector(settings.contactsSettings.formErrors) as HTMLSpanElement;

    this.button.addEventListener('click', () => {
      this.events.emit('ui:contacts-submit', { email: this.emailInput.value, phone: this.phoneInput.value })
    })

    this.emailInput.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.events.emit('ui:email-input', { value: target.value });
    });

    this.phoneInput.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.events.emit('ui:phone-input', { value: target.value });
    });
  }

  render(data: { formErrors: string, isValid: boolean }) {
    if (data) {
      this.formErrors.textContent = data.formErrors;
      this.button.disabled = !data.isValid;
    }
    return this.container;
  }
}