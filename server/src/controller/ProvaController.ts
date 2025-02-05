import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ProvaDTO } from '../dto/ProvaDTO';
import { ProvaService } from '../service/ProvaService';
import { ProvaDTOInvalidoError } from '../errors/prova/ProvaDTOInvalidoError';
import { ProfessorDTO } from '../dto/ProfessorDTO';


class ProvaController {
    private service = new ProvaService();

    async create(req: Request, res: Response): Promise<Response> {

        const provaDTO = plainToInstance(ProvaDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(provaDTO);

        const savedProva = await this.service.create(provaDTO); 
        
        const response = {
            ...instanceToPlain(savedProva),
            perguntas: savedProva.perguntas.map(pergunta => ({
                ...pergunta,
                respostas: pergunta.respostas.split('|') || [],
                professor: instanceToPlain(pergunta.professor)
            }))
        };

        return res.status(201).json(response);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const prova = await this.service.getById(id);

        const response = {
            ...instanceToPlain(prova),
            perguntas: prova.perguntas.map(pergunta => ({
                ...pergunta,
                respostas: pergunta.respostas.split('|') || [],
                professor: instanceToPlain(pergunta.professor)
            }))
        };
        
        return res.status(200).json(response);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const provas = await this.service.getAll();

        if (provas.length === 0) {
            return res.status(204).json();
        }

        const provasResponse = provas.map(prova => ({
            ...instanceToPlain(prova),
            perguntas: prova.perguntas?.map(pergunta => ({
                ...pergunta,
                respostas: pergunta.respostas.split('|') || [],
                professor: instanceToPlain(pergunta.professor)
            })),
        }));
        return res.status(200).json(provasResponse);
    }

    async patchById(req: Request, res: Response): Promise<Response> {   

        const provaDTO = plainToInstance(ProvaDTO, req.body, { excludeExtraneousValues: true });     
        
        await this.__validateDTO(provaDTO);

        const prova = await this.service.patchById(provaDTO);

        const response = {
            ...instanceToPlain(prova),
            perguntas: prova.perguntas.map(pergunta => ({
                ...pergunta,
                respostas: pergunta.respostas.split('|') || [],
                professor: instanceToPlain(pergunta.professor)
            }))
        };

        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }


    async __validateDTO(dto: ProvaDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new ProvaDTOInvalidoError(errorMessages);
        }

    }
}

export default new ProvaController();