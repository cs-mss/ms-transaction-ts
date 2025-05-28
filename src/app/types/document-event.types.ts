import { DocumentDto } from '@context/example/infrastructure/dto/create-document.dto';

export interface DocumentEventValue {
  payload: DocumentDto;
  documentType: string;
}

export interface DocumentEvent {
  value: DocumentEventValue;
}
