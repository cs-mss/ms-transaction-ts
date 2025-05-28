import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * DTO para la creación de un Document
 * Esta clase define la estructura de los datos que se reciben desde el exterior
 * para crear un Document
 */
export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  obligationType: string;

  @IsNumber()
  @IsPositive()
  orderId: number;
}

export class DocumentDto extends CreateDocumentDto {
  id: number;
}
