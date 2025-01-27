import express, { NextFunction, Request, Response } from 'express';
import RespostaController from '../controller/RespostaController';
const respostaRouter = express.Router();


respostaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await RespostaController.delete(req, res);
    } catch (error) {
      next(error);
    }
});

export default respostaRouter;
