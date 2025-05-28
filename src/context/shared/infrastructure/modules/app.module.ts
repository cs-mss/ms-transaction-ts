import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from '../config/environment/database.config';
import { DocumentModule } from '../../../example/infrastructure/module/document.module';
import { DocumentRoutesModule } from '../../../../app/routes/document.routes';
import { DocumentEventsController } from '@app/controllers/document-events.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    DatabaseModule,
    DocumentModule,
    DocumentRoutesModule,
  ],
  controllers: [DocumentEventsController],
})
export class AppModule {}
