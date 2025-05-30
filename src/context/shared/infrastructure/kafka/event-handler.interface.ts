import { DomainEvent } from '@context/example/domain/events/domain-event.interface';

export interface EventHandler {
  supports(event: any): boolean;
  publish(event: DomainEvent);
}
