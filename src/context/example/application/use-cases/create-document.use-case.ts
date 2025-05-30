import { Inject, Injectable } from '@nestjs/common';
import { Document } from '../../domain/class/document.entity';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { CreateDocumentPort } from '../ports/create-document.port';
import { REPOSITORY_TOKENS } from '../../domain/repositories/repository.tokens';
import { EventPublisher } from '@context/example/domain/events/event-publisher.interface';

@Injectable()
export class CreateDocumentUseCase implements CreateDocumentPort {
  constructor(
    @Inject(REPOSITORY_TOKENS.DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
    @Inject('EventPublisher')
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(document: Document) {
    const obligation = await this.documentRepository.save(document);
    document.recordCreatedEvents(obligation);

    const events = document.pullDomainEvents();
    for (const event of events) {
      await this.eventPublisher.publish(event);
    }

    return obligation;
  }
}
