import { Document, DocumentStatus } from '../../domain/class/document.entity';

export interface UpdateDocumentStatusPort {
  execute(documentId: number, status: DocumentStatus): Promise<Document>;
}
