import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PerguntaService } from '../service/PerguntaService';
import { PerguntaDTO } from '../dto/PerguntaDTO';
import { PerguntaDTOInvalidoError } from '../errors/pergunta/PerguntaDTOInvalidoError';


class PerguntaController {
    private service = new PerguntaService();

    async create(req: Request, res: Response): Promise<Response> {

        const perguntaDTO = plainToInstance(PerguntaDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(perguntaDTO);

        const savedPergunta = await this.service.create(perguntaDTO);  
        
        const response = instanceToPlain(savedPergunta);

        return res.status(201).json(response);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const pergunta = await this.service.getById(id);

        const perguntaResponse = instanceToPlain(pergunta);
        
        return res.status(200).json(perguntaResponse);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const professores = await this.service.getAll();

        if (professores.length === 0) {
            return res.status(204).json();
        }

        const professoresResponse = professores.map(pergunta => instanceToPlain(pergunta));

        return res.status(200).json(professoresResponse);
    }

    async patchById(req: Request, res: Response): Promise<Response> {   

        const perguntaDTO = plainToInstance(PerguntaDTO, req.body, { excludeExtraneousValues: true });     
        
        await this.__validateDTO(perguntaDTO);

        const pergunta = await this.service.patchById(perguntaDTO);

        return res.status(200).json(pergunta);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }


    async __validateDTO(dto: PerguntaDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new PerguntaDTOInvalidoError(errorMessages);
        }

    }
}

export default new PerguntaController();