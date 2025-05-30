import { DomainEvent } from './domain-event.interface';

export class AccountingObligationCreatedEvent implements DomainEvent {
  readonly occurredOn: Date;

  constructor(public readonly payload: any) {
    this.occurredOn = new Date();
  }
}
