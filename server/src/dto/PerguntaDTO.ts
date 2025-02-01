import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { TemaDTO } from './TemaDTO';
import { ProfessorDTO } from './ProfessorDTO';

export class PerguntaDTO {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: 'A descrição da pergunta é obrigatória.' })
  @MaxLength(200, { message: 'A descrição da pergunta deve ter no máximo 200 caracteres.' })
  descricao!: string;

  @Expose()
  @IsNotEmpty({ message: 'O tema associado à pergunta é obrigatório.' })
  temaId!: number;

  professorId!: number;

  @Expose()
  @IsNotEmpty({ message: 'As respostas associado à pergunta é obrigatória.' })
  respostas!: string[];
}
