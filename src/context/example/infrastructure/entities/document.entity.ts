import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from '../../domain/class/document.entity';

@Entity('obligacion')
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
  obligationType: string;

  @Column({ nullable: false })
  orderId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;

  toDomain(): Document {
    return new Document(
      this.id,
      this.number,
      this.description,
      this.date,
      this.obligationType,
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromDomain(document: Document): DocumentEntity {
    const documentEntity = new DocumentEntity();
    documentEntity.id = document.id;
    documentEntity.number = document.number;
    documentEntity.date = document.date;
    documentEntity.description = document.description;
    documentEntity.obligationType = document.obligationType;
    return documentEntity;
  }
}
