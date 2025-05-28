export interface DocumentPayload {
  number: string;
  description: string;
  date: Date;
  documentType: string;
}

export interface DocumentEventValue {
  payload: DocumentPayload;
  documentType: string;
}

export interface DocumentEvent {
  value: DocumentEventValue;
}
