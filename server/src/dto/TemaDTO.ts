import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class TemaDTO {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: 'A descrição do tema é obrigatória.' })
  @MaxLength(50, { message: 'A descrição do tema deve ter no máximo 50 caracteres.' })
  descricao!: string;

  @Expose()
  @IsNotEmpty({ message: 'A matéria associada ao tema é obrigatória.' })
  materiaId!: number;

  @Expose()
  @IsNotEmpty({ message: 'O período associado ao tema é obrigatório.' })
  periodoId!: number;

}
