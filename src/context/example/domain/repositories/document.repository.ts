import { Document } from '../class/document.entity';

/**
 * Interfaz del repositorio para la entidad Document
 * Define los métodos que debe implementar cualquier repositorio de Document.
 * Esta interfaz es parte del dominio y no depende de la infraestructura.
 */
export interface DocumentRepository {
  /**
   * Busca un Document por su ID
   * @param id ID del Document a buscar
   * @returns Promise con el Document encontrado o null si no existe
   */
  findById(id: number): Promise<Document | null>;

  /**
   * Busca todos los Documents
   * @returns Promise con un array de Documents
   */
  findAll(): Promise<Document[]>;

  /**
   * Guarda un Document
   * @param document Document a guardar
   * @returns Promise con el Document guardado
   */
  save(document: Document): Promise<Document>;
}
