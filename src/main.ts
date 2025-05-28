import { ValidationError } from 'class-validator';
import 'reflect-metadata';

import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './context/shared/infrastructure/modules/app.module';
import { ResponseInterceptor } from './app/interceptors/response.interceptor';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[] = []) => {
        const result = errors.map(
          ({ constraints }) => constraints![Object.keys(constraints!)[0]],
        );
        throw new HttpException('Invalid data', 400, { cause: result });
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: (process.env.KAFKA_BROKERS as string).split(','),
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
    },
  });

  await app.startAllMicroservices();

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3000);
}

void bootstrap();
