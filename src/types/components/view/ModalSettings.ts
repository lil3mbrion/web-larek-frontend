export interface ModalSettings<T> {
  content: T;
  closeButton: HTMLButtonElement;
  activeClass: string;
  isActive: boolean;
}