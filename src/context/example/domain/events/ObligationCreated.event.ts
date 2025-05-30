import { DomainEvent } from './domain-event.interface';

export class ObligationCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;

  constructor(public readonly payload: any) {
    this.occurredOn = new Date();
  }
}
