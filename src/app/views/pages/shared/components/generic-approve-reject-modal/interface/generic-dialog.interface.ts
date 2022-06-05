export interface GenericDialogInterface {
  dialogHeader: string;
  dialogContent: string;
  id: string;
  type: string;
  callbackMethod: (dat) => void;
}
