import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { MateriaNaoEncontradoError } from "../../errors/materia/MateriaNaoEncontradoError";
import { Materia } from "../entities/Materia";
import { MateriaJaCadastradaError } from "../../errors/materia/MateriaJaCadastradaError";
import { PgErrorCodes } from "../../enums/PgErrorCodes";

export class MateriaRepository {
  private repository = AppDataSource.getRepository(Materia);

  async save(materia: Materia): Promise<Materia> {
    try {

      return await this.repository.save(materia);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o materia:", error);

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new MateriaJaCadastradaError(materia.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o materia');

    }
  }

  async getById(id: number): Promise<Materia> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
        relations: ["temaMateria"]
      });

      if (!result) {
        throw new MateriaNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o matéria:", error);

      if (error instanceof MateriaNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o matéria');
    }
  }

  async getAll(): Promise<Materia[]> {
    try {

      const result = this.repository.find({
        relations: ["temaMateria"]
      });
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de materias:", error);

      throw new Error('Erro ao tentar buscar os materias');
    }
  }

  async patchById(materia: Materia): Promise<Materia> {
    try {
  
      await this.repository.save(materia);
      
      return materia;

    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new MateriaJaCadastradaError(materia.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar alterar o materia');

    }
  }

  async delete(materia: Materia): Promise<void> {
    try{

      await this.repository.delete(materia);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o materia:", error);

      throw new Error('Erro desconhecido ao tentar deletar o materia');
    }

  }

}