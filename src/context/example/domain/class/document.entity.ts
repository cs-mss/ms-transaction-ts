import { AggregateRoot } from '../aggregate-root';
import { ObligationCreatedEvent } from '../events/ObligationCreated.event';

export type DocumentStatus = 'CREATED' | 'ACCOUNTED';

export class Document extends AggregateRoot {
  constructor(
    readonly id: number,
    readonly number: string,
    readonly description: string,
    readonly date: Date,
    readonly obligationType: string,
    readonly orderId: number,
    readonly status: DocumentStatus = 'CREATED',
    readonly createdAt: string,
    readonly updatedAt: string,
  ) {
    super();
  }

  recordCreatedEvents(obligation: Document) {
    this.addDomainEvent(new ObligationCreatedEvent(obligation));
  }
}
