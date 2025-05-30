import { Inject, Injectable } from '@nestjs/common';
import { Document, DocumentStatus } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { UpdateDocumentStatusPort } from '../ports/update-document-status.port';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';
import { DocumentNotFoundError } from '../../domain/errors/document-not-found.error';

@Injectable()
export class UpdateDocumentStatusUseCase implements UpdateDocumentStatusPort {
  constructor(
    @Inject(REPOSITORY_TOKENS.DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  async execute(documentId: number, status: DocumentStatus): Promise<Document> {
    const document = await this.documentRepository.findById(documentId);
    if (!document) {
      throw new DocumentNotFoundError(documentId);
    }

    const updatedDocument = new Document(
      document.id,
      document.number,
      document.description,
      document.date,
      document.obligationType,
      document.orderId,
      status,
      document.createdAt,
      document.updatedAt,
    );

    return await this.documentRepository.save(updatedDocument);
  }
}
