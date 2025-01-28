import express, { NextFunction, Request, Response } from 'express';
import TemaController from '../controller/TemaController';
const temaRouter = express.Router();


temaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TemaController.create(req, res);
  } catch (error) {
    next(error);
  }
});

temaRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TemaController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

temaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TemaController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});

temaRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TemaController.patchById(req, res);
    } catch (error) {
      next(error);
    }
});

temaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TemaController.delete(req, res);
    } catch (error) {
      next(error);
    }
});

export default temaRouter;
