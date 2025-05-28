import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentDto } from '../../context/example/infrastructure/dto/create-document.dto';
import DocumentService from '@context/example/infrastructure/services/DocumentService';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.documentService.findById(Number(id));
  }

  @Get()
  async findAll() {
    return this.documentService.findAll();
  }

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentService.create(createDocumentDto);
  }
}
