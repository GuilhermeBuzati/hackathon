import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class RespostaDTO {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: 'A descrição da resposta é obrigatória.' })
  @MaxLength(200, { message: 'A descrição da resposta deve ter no máximo 200 caracteres.' })
  descricao!: string;

  @Expose()
  perguntaId!: number;
}
