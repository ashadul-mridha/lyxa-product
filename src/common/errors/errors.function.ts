import { HttpException } from '@nestjs/common';

export const throwError = (
  code: number,
  errors: object | null,
  message: string | null,
) => {
  const errorMessage = {
    code: code,
    success: false,
    message: message,
    error: errors,
  };

  throw new HttpException(errorMessage, code);
};
