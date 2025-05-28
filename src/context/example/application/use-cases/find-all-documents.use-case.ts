import { Inject, Injectable } from '@nestjs/common';
import { Document } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { FindAllDocumentsPort } from '../ports/find-all-documents.port';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';

/**
 * Implementación del caso de uso para buscar todos los Documents
 */
@Injectable()
export class FindAllDocumentsUseCase implements FindAllDocumentsPort {
  constructor(
    @Inject(REPOSITORY_TOKENS.DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para buscar todos los Documents
   * @returns Promise con un array de Documents
   */
  async execute(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }
}
