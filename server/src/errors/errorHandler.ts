import { NextFunction, Request, Response } from 'express';
import { ProfessorNaoEncontradoError } from './professor/ProfessorNaoEncontradoError';
import { ProfessorDTOInvalidoError } from './professor/ProfessorDTOInvalidoError';
import { EmailJaCadastradoError } from './professor/EmailJaCadastradoError';
import { MateriaNaoEncontradoError } from './materia/MateriaNaoEncontradoError';
import { PerguntaNaoEncontradoError } from './pergunta/PerguntaNaoEncontradoError';
import { ProvaDTOInvalidoError } from './prova/ProvaDTOInvalidoError';
import { ProvaNaoEncontradaError } from './prova/ProvaNaoEncontradaError';
import { PerguntaDTOInvalidoError } from './pergunta/PerguntaDTOInvalidoError';
import { PerguntaJaCadastradaError } from './pergunta/PerguntaJaCadastradaError';
import { TemaNaoEncontradoError } from './tema/TemaNaoEncontradoError';
import { TemaDTOInvalidoError } from './tema/TemaDTOInvalidoError';
import { TemaJaCadastradoError } from './tema/TemaJaCadastradoError';
import { MateriaDTOInvalidaError } from './materia/MateriaDTOInvalidaError';
import { MateriaJaCadastradaError } from './materia/MateriaJaCadastradaError';
import { EmailNaoEncontradoError } from './professor/EmailNaoEncontradoError';
import { EmailSenhaInvalidoError } from './professor/EmailSenhaInvalidosError';
import { LoginDTOInvalidoError } from './professor/LoginDTOInvalidoError';
import { MateriaUtilizadaError } from './materia/MateriaUtilizadaError';
import { TemaUtilizadaError } from './tema/TemaUtilizadaError';
import { ProfessorUtilizadaError } from './professor/ProfessorUtilizadaError';


//eslint-disable-next-line
export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ProfessorNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  } 

  if (error instanceof EmailJaCadastradoError) {
    res.status(error.statusCode).json({ error: error.details });
  }

  if (error instanceof ProfessorDTOInvalidoError) {
    res.status(error.statusCode).json({ error: error.details });
  }

  if (error instanceof MateriaNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof MateriaDTOInvalidaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof MateriaJaCadastradaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof PerguntaNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof PerguntaDTOInvalidoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof PerguntaJaCadastradaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof ProvaDTOInvalidoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof ProvaNaoEncontradaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof TemaNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof TemaDTOInvalidoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof TemaJaCadastradoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof EmailNaoEncontradoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof EmailSenhaInvalidoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof LoginDTOInvalidoError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof MateriaUtilizadaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if (error instanceof TemaUtilizadaError) {
    res.status(error.statusCode).json({ message: error.details });
  }

  if(error instanceof ProfessorUtilizadaError) {
    res.status(error.statusCode).json({ message: error.details });
  }
  
  console.error(error);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({ error: "Erro interno no servidor" });
  
}
