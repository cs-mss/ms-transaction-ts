export interface AccountingEventPayload {
  associatedDocId: number;
}

export interface AccountingEvent {
  key: string;
  value: {
    occurredOn: string;
    payload: AccountingEventPayload;
  };
}
