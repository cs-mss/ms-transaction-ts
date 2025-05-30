import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ObligationCreatedEventHandler } from './event-handlers/obligation-created.handler';
import { AccountingObligationCreatedEventHandler } from './event-handlers/accounting-obligation-created.handler';
import { KafkaEventPublisher } from './kafka-event-publisher';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId:
                configService.get<string>('kafka.host') || 'default-client',
              brokers: configService
                .get<string>('kafka.brokers')
                ?.split(',') || ['kafka1:9092'],
            },
            consumer: {
              groupId:
                configService.get<string>('kafka.port') || 'default-group',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    ObligationCreatedEventHandler,
    AccountingObligationCreatedEventHandler,
    {
      provide: 'EventPublisher',
      useFactory: (
        orderHandler: ObligationCreatedEventHandler,
        accountingHandler: AccountingObligationCreatedEventHandler,
      ) => new KafkaEventPublisher([orderHandler, accountingHandler]),
      inject: [
        ObligationCreatedEventHandler,
        AccountingObligationCreatedEventHandler,
      ],
    },
  ],
  exports: ['EventPublisher'],
})
export class KafkaModule {}
