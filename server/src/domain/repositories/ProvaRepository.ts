import { AppDataSource } from "../../data-source";
import { Prova } from "../entities/Prova";
import { ProvaNaoEncontradaError } from "../../errors/prova/ProvaNaoEncontradaError";

export class ProvaRepository {
  private repository = AppDataSource.getRepository(Prova);

  async save(prova: Prova): Promise<Prova> {
    try {

      return await this.repository.save(prova);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o prova:", error);
      throw new Error('Erro desconhecido ao tentar salvar o prova');

    }
  }

  async getById(id: number): Promise<Prova> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
        relations: ['materia', 'perguntas']
      });

      if (!result) {
        throw new ProvaNaoEncontradaError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o prova:", error);

      if (error instanceof ProvaNaoEncontradaError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o prova');
    }
  }

  async getAll(): Promise<Prova[]> {
    try {

      const result = this.repository.find({
        relations: ['materia', 'perguntas']
      });
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de temas:", error);

      throw new Error('Erro ao tentar buscar os temas');
    }
  }

  async getByMateriaId(materiaId: number): Promise<Prova[]> {
    try {
      const result = await this.repository.find({
        where: {
          materia: { id: materiaId },
        }
      });
  
      return result;
    } catch (error) {
      console.error("Erro ao buscar os provas da matéria:", error);
      throw new Error("Erro ao tentar buscar os provas da matéria");
    }
  }

  async patchById(prova: Prova): Promise<Prova> {
    try {
 
      await this.repository.save(prova);
      
      return prova;

    } catch (error: unknown) {
      throw new Error('Erro desconhecido ao tentar alterar o prova');

    }
  }

  async delete(prova: Prova): Promise<void> {
    try{

      await this.repository.remove(prova);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o prova:", error);

      throw new Error('Erro desconhecido ao tentar deletar o prova');
    }

  }
}