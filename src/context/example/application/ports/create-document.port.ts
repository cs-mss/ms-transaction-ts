import { Document } from '../../domain/class/document.entity';

/**
 * Puerto de entrada para el caso de uso de creación de un Document
 * Define el contrato que debe implementar cualquier caso de uso de creación de Document
 */
export interface CreateDocumentPort {
  /**
   * Ejecuta el caso de uso de creación de un Document
   * @param document Document a crear
   * @returns Promise con el Document creado
   */
  execute(document: Document): Promise<Document>;
}
