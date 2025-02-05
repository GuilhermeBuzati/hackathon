import { Request, Response } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ProfessorService } from "../service/ProfessorService";
import { LoginDTO, ProfessorDTO } from "../dto/ProfessorDTO";
import { ProfessorDTOInvalidoError } from "../errors/professor/ProfessorDTOInvalidoError";
import { AuthService } from "../service/AuthSerice";
import { LoginDTOInvalidoError } from "../errors/professor/LoginDTOInvalidoError";

class ProfessorController {
  private service = new ProfessorService();
  private authService = new AuthService();

  async create(req: Request, res: Response): Promise<Response> {
    const professorDTO = plainToInstance(ProfessorDTO, req.body, {
      excludeExtraneousValues: true,
    });
    const senha = professorDTO.senha;
    professorDTO.senha = await this.authService.hashPassword(senha);

    await this.__validateDTO(professorDTO);

    const savedProfessor = await this.service.create(professorDTO);

    const token = await this.authService.login({
      email: savedProfessor.email,
      senha: senha,
    });

    const professorResponse = instanceToPlain(savedProfessor);

    professorResponse.token = token;

    return res.status(201).json(professorResponse);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    const professor = await this.service.getById(id);

    const professorResponse = instanceToPlain(professor);

    return res.status(200).json(professorResponse);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const professores = await this.service.getAll();

    if (professores.length === 0) {
      return res.status(204).json();
    }

    const professoresResponse = professores.map((professor) =>
      instanceToPlain(professor)
    );

    return res.status(200).json(professoresResponse);
  }

  async patchById(req: Request, res: Response): Promise<Response> {
    const professorDTO = plainToInstance(ProfessorDTO, req.body, {
      excludeExtraneousValues: true,
    });

    professorDTO.senha = await this.authService.hashPassword(
      professorDTO.senha
    );

    await this.__validateDTO(professorDTO);

    const professor = await this.service.patchById(professorDTO);

    const professorResponse = instanceToPlain(professor);

    return res.status(200).json(professorResponse);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    await this.service.deleteById(id);

    return res.status(204).json();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginDTO = plainToInstance(LoginDTO, req.body, {
      excludeExtraneousValues: true,
    });

    await this.__validateLoginDTO(loginDTO);

    const resposta = await this.authService.login(loginDTO);

    return res.status(200).json(resposta);
  }

  async __validateDTO(dto: ProfessorDTO): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      throw new ProfessorDTOInvalidoError(errorMessages);
    }
  }

  async __validateLoginDTO(dto: LoginDTO): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      throw new LoginDTOInvalidoError(errorMessages);
    }
  }
}

export default new ProfessorController();
