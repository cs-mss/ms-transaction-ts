import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from '../../domain/class/document.entity';

/**
 * Entidad de infraestructura para Document
 * Esta clase es la representación de la entidad Document en la base de datos
 */
@Entity('document')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  documentType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;

  /**
   * Convierte la entidad de infraestructura a una entidad de dominio
   * @returns Entidad de dominio Document
   */
  toDomain(): Document {
    return new Document(
      this.id,
      this.number,
      this.description,
      this.date,
      this.documentType,
      this.createdAt,
      this.updatedAt,
    );
  }

  /**
   * Crea una entidad de infraestructura a partir de una entidad de dominio
   * @param document Entidad de dominio Document
   * @returns Entidad de infraestructura DocumentEntity
   */
  static fromDomain(document: Document): DocumentEntity {
    const documentEntity = new DocumentEntity();
    documentEntity.id = document.id;
    documentEntity.number = document.number;
    documentEntity.date = document.date;
    documentEntity.description = document.description;
    documentEntity.documentType = document.documentType;
    return documentEntity;
  }
}
