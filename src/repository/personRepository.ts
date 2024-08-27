import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Validations } from 'src/service/validations';
import { Person } from 'src/types/types';

@Injectable()
export class PersonRepository {
  constructor(
    private validations: Validations,
    private prismaService: PrismaService,
  ) {}

  async findByEmail(email: string) {
    const result = await this.prismaService.person.findMany({
      where: {
        email: email,
      },
    });
    return result;
  }

  async createPerson(person: Person) {
    try {
      const respEmailExist = await this.findByEmail(person.email);
      if (respEmailExist.length > 0) {
        throw new BadRequestException('Já existe alguém com este e-mail');
      }

      const resp = this.validations.createValidation(person.name, person.email);

      if (resp !== 'ok') {
        throw new BadRequestException(resp);
      }

      const result = await this.prismaService.person.create({
        data: {
          name: person.name,
          email: person.email,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async readPersons() {
    try {
      const result = await this.prismaService.person.findMany();
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async readById(id: string) {
    const converted = parseInt(id);
    try {
      const result = await this.prismaService.person.findMany({
        where: {
          id: converted,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePerson(id: string, person: Person) {
    try {
      const resp = this.validations.createValidation(person.name, person.email);

      if (resp == 'ok') {
        const converted = parseInt(id);
        const result = await this.prismaService.person.update({
          where: {
            id: converted,
          },
          data: {
            name: person.name,
            email: person.email,
          },
        });

        return result;
      }

      throw new BadRequestException(resp);
    } catch (error) {
      throw error;
    }
  }

  async deletePerson(id: string) {
    try {
      const converted = parseInt(id);
      await this.prismaService.person.delete({
        where: {
          id: converted,
        },
      });

      return 'Usuário excluído com êxito!';
    } catch (error) {
      throw error;
    }
  }
}
