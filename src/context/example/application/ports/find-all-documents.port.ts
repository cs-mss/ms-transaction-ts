import { Document } from '../../domain/class/document.entity';

/**
 * Puerto de entrada para el caso de uso de búsqueda de todos los Documents
 * Define el contrato que debe implementar cualquier caso de uso de búsqueda de todos los Documents
 */
export interface FindAllDocumentsPort {
  /**
   * Ejecuta el caso de uso de búsqueda de todos los Documents
   * @returns Promise con un array de Documents
   */
  execute(): Promise<Document[]>;
}
