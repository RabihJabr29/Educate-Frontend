export interface CreateAnnouncementModalConfig {
  modalTitle: string;
  dismissButtonLabel?: string;
  closeButtonLabel?: string;
  shouldClose?(): Promise<boolean> | boolean;
  shouldDismiss?(): Promise<boolean> | boolean;
  onClose?(): Promise<boolean> | boolean;
  onDismiss?(): Promise<boolean> | boolean;
  disableCloseButton?(): boolean;
  disableDismissButton?(): boolean;
  hideCloseButton?(): boolean;
  hideDismissButton?(): boolean;

  createButtonLabel?: string;
  onCreate(): Promise<boolean> | boolean;
  shouldCreate?(): Promise<boolean> | boolean;
  hideCreateButton?(): boolean;
  disableCreateButton?(): boolean;
}
