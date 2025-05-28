import DocumentService from '@context/example/infrastructure/services/DocumentService';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DocumentEvent } from '../types/document-event.types';

@Controller()
export class DocumentEventsController {
  constructor(private readonly documentService: DocumentService) {}

  @MessagePattern('document-created')
  async handleDocumentCreated(@Payload() message: string) {
    console.log('Document Created Event');
    console.log('Raw message:', message);

    try {
      const { value } = JSON.parse(JSON.stringify(message)) as DocumentEvent;
      return await this.documentService.create({
        ...value.payload,
        documentType: value.documentType,
      });
    } catch (error) {
      console.error('Error processing document created event:', error);
      throw new Error('Failed to process document created event');
    }
  }
}
