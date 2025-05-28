import { Inject, Injectable } from '@nestjs/common';
import { Document } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { FindDocumentPort } from '../ports/find-document.port';
import { DocumentNotFoundError } from '../../domain/errors/document-not-found.error';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';

/**
 * Implementación del caso de uso para buscar un Document por su ID
 */
@Injectable()
export class FindDocumentUseCase implements FindDocumentPort {
  constructor(
    @Inject(REPOSITORY_TOKENS.DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para buscar un Document por su ID
   * @param id ID del Document a buscar
   * @returns Promise con el Document encontrado
   * @throws DocumentNotFoundError si no se encuentra el Document
   */

  async execute(id: number): Promise<Document> {
    const document = await this.documentRepository.findById(id);

    if (!document) {
      throw new DocumentNotFoundError(id);
    }

    return document;
  }
}
