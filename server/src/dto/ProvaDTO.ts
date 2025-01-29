import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { PerguntaDTO } from './PerguntaDTO';

export class ProvaDTO {
    @Expose()
    id!: number;

    @Expose()
    @IsNotEmpty({ message: 'O título da prova é obrigatório.' })
    @MaxLength(50, { message: 'O título da prova deve ter no máximo 50 caracteres.' })
    titulo!: string;

    @Expose()
    materiaId: number | undefined;

    @Expose()
    @IsArray({ message: 'As perguntas devem ser fornecidas como uma lista.' })
    @ValidateNested({ each: true })
    perguntas!: number[];
}