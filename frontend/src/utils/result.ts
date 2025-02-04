export type Result<T> = ResultOk<T> | ResultErr;

type ResultOk<T> = {
  isOk: true;
  isErr: false;
  data: T;
};

type ResultErr = {
  isOk: false;
  isErr: true;
  error: string;
};

export function ok<T>(data: T): Result<T> {
  return {
    isOk: true,
    isErr: false,
    data: data,
  };
}

export function err<T>(data: string): Result<T> {
  return {
    isOk: false,
    isErr: true,
    error: data,
  };
}
