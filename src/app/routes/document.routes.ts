import { Module } from '@nestjs/common';
import { DocumentController } from '../controllers/document.controller';
import { DocumentModule } from '../../context/example/infrastructure/module/document.module';

/**
 * Módulo de rutas para Document
 * Este módulo registra el controlador de Document y sus dependencias
 */
@Module({
  imports: [DocumentModule],
  controllers: [DocumentController],
})
export class DocumentRoutesModule {}
