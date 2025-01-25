import { Professor } from "../domain/entities/Professor";
import { ProfessorRepository } from "../domain/repositories/ProfessorRepository";
import { ProfessorDTO } from "../dto/ProfessorDTO";


export class ProfessorService {
  private alimentoRepository = new ProfessorRepository();

  async createAlimento(professorDTO: ProfessorDTO): Promise<Professor> {

    const professor = new Professor();
    professor.nome = professorDTO.nome;
    professor.email = professorDTO.email;
    professor.senha = professorDTO.senha;

    return await this.alimentoRepository.save(professor);
  }
}