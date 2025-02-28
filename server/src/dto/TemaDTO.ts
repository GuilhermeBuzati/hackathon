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
  @IsNotEmpty({ message: 'A descrição de período é obrigatória.' })
  @MaxLength(50, { message: 'A descrição de período deve ter no máximo 50 caracteres.' })
  periodo!: string;

  @Expose()
  @IsNotEmpty({ message: 'A matéria associada ao tema é obrigatória.' })
  materiaId!: number;

}
