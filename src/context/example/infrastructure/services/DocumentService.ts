import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';
import { CreateDocumentPort } from '@context/example/application/ports/create-document.port';
import { FindAllDocumentsPort } from '@context/example/application/ports/find-all-documents.port';
import { FindDocumentPort } from '@context/example/application/ports/find-document.port';
import { USE_CASE_TOKENS } from '@context/example/application/ports/use-case.tokens';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { Document } from '@context/example/domain/class/document.entity';

@Injectable()
export default class DocumentService {
  constructor(
    @Inject(USE_CASE_TOKENS.CREATE_DOCUMENT_USE_CASE)
    private readonly createDocument: CreateDocumentPort,
    @Inject(USE_CASE_TOKENS.FIND_DOCUMENT_USE_CASE)
    private readonly getDocument: FindDocumentPort,
    @Inject(USE_CASE_TOKENS.FIND_ALL_DOCUMENTS_USE_CASE)
    private readonly getAllDocuments: FindAllDocumentsPort,
  ) {}

  async findById(documentId: number) {
    const document = await this.getDocument.execute(documentId);
    if (!document) {
      throw new NotFoundException(`Document not found with id: ${documentId}`);
    }
    return document;
  }

  async create(dto: CreateDocumentDto) {
    const documentCreated = await this.createDocument.execute(
      this.dtoToDomain(dto),
    );
    if (!documentCreated) {
      throw new BadRequestException('Document not created');
    }
    return documentCreated;
  }

  async findAll() {
    return await this.getAllDocuments.execute();
  }

  private dtoToDomain(dto: CreateDocumentDto) {
    return new Document(
      emptyNumber(),
      dto.number,
      dto.description,
      dto.date,
      dto.documentType,
      emptyString(),
      emptyString(),
    );
  }
}
