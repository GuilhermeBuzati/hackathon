import { NextFunction, Request, Response } from 'express';
import { ProfessorNaoEncontradoError } from './professor/ProfessorNaoEncontradoError';
import { ProfessorDTOInvalidoError } from './professor/ProfessorDTOInvalidoError';
import { EmailJaCadastradoError } from './professor/EmailJaCadastradoError';


//eslint-disable-next-line
export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ProfessorNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  } 

  if (error instanceof EmailJaCadastradoError) {
    res.status(error.statusCode).json({ error: error });
  }

  if (error instanceof ProfessorDTOInvalidoError) {
    res.status(error.statusCode).json({ error: error.details });
  }
  console.error(error);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({ error: "Erro interno no servidor" });
  
}
