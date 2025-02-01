import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { PeriodoService } from '../service/PeriodoService';
import { PeriodoDTO } from '../dto/PeriodoDTO';
import { validate } from 'class-validator';
import { PeriodoDTOInvalidoError } from '../errors/periodo/PeriodoDTOInvalidoError';


class PeriodoController {
    private service = new PeriodoService();

    async create(req: Request, res: Response): Promise<Response> {

        const periodoDTO = plainToInstance(PeriodoDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(periodoDTO);

        const periodo = await this.service.create(periodoDTO);            

        return res.status(201).json(periodo);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const periodo = await this.service.getById(id);

        const periodoResponse = instanceToPlain(periodo);
        
        return res.status(200).json(periodoResponse);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const periodos = await this.service.getAll();

        if (periodos.length === 0) {
            return res.status(204).json();
        }

        const periodoesResponse = periodos.map(periodo => instanceToPlain(periodo));

        return res.status(200).json(periodoesResponse);
    }

    async patchById(req: Request, res: Response): Promise<Response> {   
    
        const periodoDTO = plainToInstance(PeriodoDTO, req.body, { excludeExtraneousValues: true });     
        
        await this.__validateDTO(periodoDTO);

        const periodo = await this.service.patchById(periodoDTO);

        return res.status(200).json(periodo);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }
    
    async __validateDTO(dto: PeriodoDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new PeriodoDTOInvalidoError(errorMessages);
        }

    }
    
}

export default new PeriodoController();