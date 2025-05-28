import { Inject, Injectable } from '@nestjs/common';
import { Document } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { CreateDocumentPort } from '../ports/create-document.port';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';

/**
 * Implementación del caso de uso para crear un Document
 */
@Injectable()
export class CreateDocumentUseCase implements CreateDocumentPort {
  constructor(
    @Inject(REPOSITORY_TOKENS.DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para crear un Document
   * @param document Document a crear
   * @returns Promise con el Document creado
   */
  async execute(document: Document): Promise<Document> {
    return this.documentRepository.save(document);
  }
}
