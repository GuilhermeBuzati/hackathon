import express, { NextFunction, Request, Response } from 'express';
import ProfessorController from '../controller/ProfessorController';
const professorRouter = express.Router();


professorRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProfessorController.create(req, res);
  } catch (error) {
    next(error);
  }
});


export default professorRouter;
