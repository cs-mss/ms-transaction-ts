import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '../entities/document.entity';
import { DocumentRepositoryImpl } from '../repositories/document.repository.impl';
import { FindDocumentUseCase } from '../../application/use-cases/find-document.use-case';
import { FindAllDocumentsUseCase } from '../../application/use-cases/find-all-documents.use-case';
import { CreateDocumentUseCase } from '../../application/use-cases/create-document.use-case';
import { USE_CASE_TOKENS } from '../../application/ports/use-case.tokens';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';
import DocumentService from '../services/DocumentService';

/**
 * Módulo de Document
 * Este módulo configura todas las dependencias necesarias para el contexto de Document
 */
@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  providers: [
    // Repositorio
    {
      provide: REPOSITORY_TOKENS.DOCUMENT_REPOSITORY,
      useClass: DocumentRepositoryImpl,
    },
    // Casos de uso
    {
      provide: USE_CASE_TOKENS.FIND_DOCUMENT_USE_CASE,
      useClass: FindDocumentUseCase,
    },
    {
      provide: USE_CASE_TOKENS.FIND_ALL_DOCUMENTS_USE_CASE,
      useClass: FindAllDocumentsUseCase,
    },
    {
      provide: USE_CASE_TOKENS.CREATE_DOCUMENT_USE_CASE,
      useClass: CreateDocumentUseCase,
    },
    // Instancias directas para inyección
    DocumentService,
    FindDocumentUseCase,
    FindAllDocumentsUseCase,
    CreateDocumentUseCase,
  ],
  exports: [
    DocumentService,
    REPOSITORY_TOKENS.DOCUMENT_REPOSITORY,
    USE_CASE_TOKENS.FIND_DOCUMENT_USE_CASE,
    USE_CASE_TOKENS.FIND_ALL_DOCUMENTS_USE_CASE,
    USE_CASE_TOKENS.CREATE_DOCUMENT_USE_CASE,
  ],
})
export class DocumentModule {}
