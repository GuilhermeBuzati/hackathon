import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';
import { RespostaDTO } from './RespostaDTO'; // Assumindo que o DTO de Resposta está neste caminho

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

  @Expose()
  @IsNotEmpty({ message: 'O professor associado à pergunta é obrigatório.' })
  professorId!: number;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => RespostaDTO)
  respostasPergunta!: RespostaDTO[];
}
