import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Validations } from 'src/service/validations';

@Injectable()
export class PersonRepository {
  constructor(
    private validations: Validations,
    private prismaService: PrismaService,
  ) {}

  createPerson(name: string, email: string) {
    try {
      const resp = this.validations.createValidation(name, email);

      if (resp !== 'ok') {
        throw new BadRequestException(resp);
      }

      const result = this.prismaService.person.create({
        data: {
          name: name,
          email: email,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
