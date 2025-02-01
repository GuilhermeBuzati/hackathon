import { Expose, Type } from "class-transformer";
import { IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { TemaDTO } from "./TemaDTO";

export class MateriaDTO {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: "A descrição da matéria é obrigatória." })
  @MaxLength(50, { message: "A descrição da matéria deve ter no máximo 50 caracteres." })
  descricao!: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => TemaDTO)
  temaMateria!: TemaDTO[];
}
