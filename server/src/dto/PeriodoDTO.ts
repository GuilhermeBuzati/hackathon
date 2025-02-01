import { Expose, Type } from "class-transformer";
import { IsNotEmpty, MaxLength, ValidateNested } from "class-validator";
import { TemaDTO } from "./TemaDTO";

export class PeriodoDTO {
  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty({ message: "A descrição do período é obrigatória." })
  @MaxLength(50, { message: "A descrição do período deve ter no máximo 50 caracteres." })
  descricao!: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => TemaDTO)
  temaPeriodo!: TemaDTO[];
}
