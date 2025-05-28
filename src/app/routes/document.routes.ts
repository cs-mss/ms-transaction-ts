import { Module } from '@nestjs/common';
import { DocumentController } from '../controllers/document.controller';
import { DocumentModule } from '../../context/example/infrastructure/module/document.module';

@Module({
  imports: [DocumentModule],
  controllers: [DocumentController],
})
export class DocumentRoutesModule {}
