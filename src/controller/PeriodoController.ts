import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { PeriodoService } from '../service/PeriodoService';


class PeriodoController {
    private service = new PeriodoService();

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
}

export default new PeriodoController();