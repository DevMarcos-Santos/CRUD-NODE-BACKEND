import { Injectable } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class Validations {
  createValidation(name: string, email: string): string | object {
    try {
      const validPerson = z.object({
        name: z.string().min(3, 'Nome inválido'),
        email: z.string().email('E-mail inválido'),
      });

      const person = {
        name: name,
        email: email,
      };
      validPerson.parse(person);

      return 'ok';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
    }
  }
}
