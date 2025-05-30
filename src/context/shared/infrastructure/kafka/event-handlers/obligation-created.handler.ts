import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { EventHandler } from '../event-handler.interface';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';
import { DomainEvent } from '@context/example/domain/events/domain-event.interface';
import { ObligationCreatedEvent } from '@context/example/domain/events/ObligationCreated.event';

@Injectable()
export class ObligationCreatedEventHandler
  implements EventHandler, OnModuleInit
{
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  supports(event: DomainEvent): boolean {
    return event instanceof ObligationCreatedEvent;
  }

  async publish(event: ObligationCreatedEvent) {
    try {
      await lastValueFrom(
        this.kafka.emit(
          'obligation-created',
          JSON.stringify({
            key: uuidv4(),
            value: event,
          }),
        ),
      );
      console.log(`✅ Published event to topic ${'obligation-created'}`);
    } catch (err) {
      console.error(`❌ Kafka publish failed:`, err);
      throw err;
    }
  }
}
