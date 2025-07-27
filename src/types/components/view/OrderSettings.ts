export interface OrderSettings {
  modalTitle: string;
  onlineButton: HTMLButtonElement;
  offlineButton: HTMLButtonElement;
  addressLabel: string,
  addressInput: HTMLInputElement;
  orderButton: HTMLButtonElement;
  formErrors: string;
  isValid: boolean;
}