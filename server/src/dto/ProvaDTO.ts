import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, IsNumber, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class ProvaDTO {
 
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: "O título da prova é obrigatório." })
  @MaxLength(50, { message: "O título deve ter no máximo 50 caracteres." })
  titulo!: string;

  @Expose()
  @IsNotEmpty({ message: "O ID da matéria é obrigatório." })
  @IsNumber({}, { message: "O ID da matéria deve ser um número." })
  materiaId!: number;

  @Expose()
  @IsArray({ message: "As perguntas devem ser um array." })
  @ArrayNotEmpty({ message: "A prova deve ter pelo menos uma pergunta." })
  @IsNumber({}, { each: true, message: "Cada pergunta deve ser um número." })
  perguntas!: number[];
}
