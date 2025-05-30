import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../filters/validation.filter';

export function createGlobalValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    skipMissingProperties: false,
    whitelist: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formatErrors = (
        validationErrors: ValidationError[],
      ): Record<string, string[]> => {
        const result = {};

        validationErrors.forEach((error) => {
          if (error.constraints) {
            result[error.property] = Object.values(error.constraints);
          }
          if (error.children && error.children.length > 0) {
            const childErrors = formatErrors(error.children);
            Object.keys(childErrors).forEach((key) => {
              result[`${error.property}.${key}`] = childErrors[key];
            });
          }
        });

        return result;
      };

      const formattedErrors = formatErrors(errors);
      return new ValidationException(formattedErrors);
    },
  });
}
