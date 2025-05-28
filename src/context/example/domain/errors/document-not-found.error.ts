/**
 * Error de dominio para cuando no se encuentra un Document
 * Este error se lanza cuando se intenta acceder a un Document que no existe
 */
export class DocumentNotFoundError extends Error {
  constructor(id: number) {
    super(`Document with id ${id} not found`);
    this.name = 'DocumentNotFoundError';
  }
}
