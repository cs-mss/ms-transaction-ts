import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { emptyNumber, emptyString } from '@context/shared/utils/empty.utils';
import { CreateDocumentPort } from '@context/example/application/ports/create-document.port';
import { FindAllDocumentsPort } from '@context/example/application/ports/find-all-documents.port';
import { FindDocumentPort } from '@context/example/application/ports/find-document.port';
import { UpdateDocumentStatusPort } from '@context/example/application/ports/update-document-status.port';
import { USE_CASE_TOKENS } from '@context/example/application/ports/use-case.tokens';
import { CreateDocumentDto } from '../dto/create-document.dto';
import {
  Document,
  DocumentStatus,
} from '@context/example/domain/class/document.entity';
import { DocumentNotFoundError } from '@context/example/domain/errors/document-not-found.error';

@Injectable()
export default class DocumentService {
  constructor(
    @Inject(USE_CASE_TOKENS.CREATE_DOCUMENT_USE_CASE)
    private readonly createDocument: CreateDocumentPort,
    @Inject(USE_CASE_TOKENS.FIND_DOCUMENT_USE_CASE)
    private readonly getDocument: FindDocumentPort,
    @Inject(USE_CASE_TOKENS.FIND_ALL_DOCUMENTS_USE_CASE)
    private readonly getAllDocuments: FindAllDocumentsPort,
    @Inject(USE_CASE_TOKENS.UPDATE_DOCUMENT_STATUS_USE_CASE)
    private readonly updateDocumentStatus: UpdateDocumentStatusPort,
  ) {}

  async findById(documentId: number) {
    try {
      return await this.getDocument.execute(documentId);
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error finding document');
    }
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

  async updateStatus(documentId: number, status: DocumentStatus) {
    try {
      return await this.updateDocumentStatus.execute(documentId, status);
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error updating document status');
    }
  }

  private dtoToDomain(dto: CreateDocumentDto) {
    return new Document(
      emptyNumber(),
      dto.number,
      dto.description,
      dto.date,
      dto.obligationType,
      dto.orderId,
      'CREATED',
      emptyString(),
      emptyString(),
    );
  }
}
