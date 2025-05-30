import { Injectable } from '@nestjs/common';
import { EventHandler } from './event-handler.interface';
import { EventPublisher } from '@context/example/domain/events/event-publisher.interface';
import { DomainEvent } from '@context/example/domain/events/domain-event.interface';

@Injectable()
export class KafkaEventPublisher implements EventPublisher {
  constructor(private readonly handlers: EventHandler[]) {}

  async publish(event: DomainEvent): Promise<void> {
    const handler = this.handlers.find((h) => h.supports(event));
    if (!handler) {
      throw new Error(`No handler found for event: ${event.constructor.name}`);
    }
    console.log('publicando el evento', event);
    await handler.publish(event);
  }
}
