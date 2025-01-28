import { Request, Response } from 'express';
import { RespostaService } from '../service/RespostaService';


class RespostaController {
    private service = new RespostaService();

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }

}

export default new RespostaController();