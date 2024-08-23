import { Injectable } from '@nestjs/common';
import { PersonRepository } from 'src/repository/personRepository';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async create(name: string, email: string) {
    try {
      const result = await this.personRepository.createPerson(name, email);
      return result;
    } catch (error) {
      throw error.message;
    }
  }
}
