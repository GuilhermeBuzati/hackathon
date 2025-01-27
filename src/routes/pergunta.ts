import express, { NextFunction, Request, Response } from 'express';
import PerguntaController from '../controller/PerguntaController';
const perguntaRouter = express.Router();


perguntaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PerguntaController.create(req, res);
  } catch (error) {
    next(error);
  }
});

perguntaRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PerguntaController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

perguntaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PerguntaController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});

perguntaRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PerguntaController.patchById(req, res);
    } catch (error) {
      next(error);
    }
});

perguntaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PerguntaController.delete(req, res);
    } catch (error) {
      next(error);
    }
});

export default perguntaRouter;
