import DocumentService from '@context/example/infrastructure/services/DocumentService';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountingEvent } from '@app/types/accounting-event.types';

@Controller()
export class AccountingEventsController {
  constructor(private readonly documentService: DocumentService) {}

  @MessagePattern('accounting-obligation-created')
  async handleAccountingObligationCreated(@Payload() message: string) {
    console.log('Accounting Obligation Created Event');
    console.log('Raw message:', message);

    try {
      const parsedMessage = JSON.parse(
        JSON.stringify(message),
      ) as AccountingEvent;
      const documentId = parsedMessage.value.payload.associatedDocId;
      return await this.documentService.updateStatus(documentId, 'ACCOUNTED');
    } catch (error) {
      console.error(
        'Error processing accounting obligation created event:',
        error,
      );
      throw new Error('Failed to process accounting obligation created event');
    }
  }
}
