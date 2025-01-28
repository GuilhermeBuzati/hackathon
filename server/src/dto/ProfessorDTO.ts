import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ProfessorDTO {
    @Expose()
    id!: number;  // O id será incluído aqui

    @Expose()
    @IsNotEmpty({ message: 'O nome do professor é obrigatório.' })
    @MaxLength(50, { message: 'O nome do professor deve ter no máximo 50 caracteres.' })
    nome!: string;

    @Expose()
    @IsNotEmpty({ message: 'O email do professor é obrigatório.' })
    @MaxLength(100, { message: 'O email do professor deve ter no máximo 100 caracteres.' })
    email!: string;

    @Expose()
    @IsNotEmpty({ message: 'A senha do professor é obrigatório.' })
    @MaxLength(80, { message: 'A senha do professor deve ter no máximo 80 caracteres.' })
    senha!: string;

}
