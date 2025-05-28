import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { DocumentEntity } from '../entities/document.entity';

/**
 * Implementación del repositorio de Document
 * Esta clase implementa la interfaz DocumentRepository definida en el dominio
 * y utiliza TypeORM para interactuar con la base de datos
 */
@Injectable()
export class DocumentRepositoryImpl implements DocumentRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  /**
   * Busca un Document por su ID
   * @param id ID del Document a buscar
   * @returns Promise con el Document encontrado o null si no existe
   */
  async findById(id: number): Promise<Document | null> {
    const documentEntity = await this.documentRepository.findOne({
      where: { id },
    });

    if (!documentEntity) {
      return null;
    }

    return documentEntity.toDomain();
  }

  /**
   * Busca todos los Documents
   * @returns Promise con un array de Documents
   */
  async findAll(): Promise<Document[]> {
    const documentEntities = await this.documentRepository.find();
    return documentEntities.map((entity) => entity.toDomain());
  }

  /**
   * Guarda un Document
   * @param document Document a guardar
   * @returns Promise con el Document guardado
   */
  async save(document: Document): Promise<Document> {
    const documentEntity = DocumentEntity.fromDomain(document);
    const savedEntity = await this.documentRepository.save(documentEntity);
    return savedEntity.toDomain();
  }
}
