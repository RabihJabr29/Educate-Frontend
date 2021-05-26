export interface StudentSubmissionModalConfig {
  modalTitle: string;
  dismissButtonLabel?: string;
  closeButtonLabel?: string;
  saveButtonLabel?: string;

  shouldSave?(): Promise<boolean> | boolean;
  shouldClose?(): Promise<boolean> | boolean;
  shouldDismiss?(): Promise<boolean> | boolean;
  onClose?(): Promise<boolean> | boolean;
  onDismiss?(): Promise<boolean> | boolean;
  onSave?(): Promise<boolean> | boolean;

  disableCloseButton?(): boolean;
  disableDismissButton?(): boolean;
  disableSaveButton?(): boolean;


  hideCloseButton?(): boolean;
  hideSaveButton?(): boolean;
  hideDismissButton?(): boolean;
}
