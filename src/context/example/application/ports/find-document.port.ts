import { Document } from '../../domain/class/document.entity';

/**
 * Puerto de entrada para el caso de uso de búsqueda de un Document
 * Define el contrato que debe implementar cualquier caso de uso de búsqueda de Document
 */
export interface FindDocumentPort {
  /**
   * Ejecuta el caso de uso de búsqueda de un Document por su ID
   * @param id ID del Document a buscar
   * @returns Promise con el Document encontrado
   */
  execute(id: number): Promise<Document>;
}
