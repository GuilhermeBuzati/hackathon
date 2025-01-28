import { AppDataSource } from "../../data-source";
import { MateriaNaoEncontradoError } from "../../errors/materia/MateriaNaoEncontradoError";
import { Materia } from "../entities/Materia";

export class MateriaRepository {
  private repository = AppDataSource.getRepository(Materia);

  async getById(id: number): Promise<Materia> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
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

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de materias:", error);

      throw new Error('Erro ao tentar buscar os materias');
    }
  }

}