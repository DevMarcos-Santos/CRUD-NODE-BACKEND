import { Injectable } from '@nestjs/common';
import { PersonRepository } from 'src/repository/personRepository';
import { Person } from 'src/types/types';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async create(person: Person) {
    try {
      const result = await this.personRepository.createPerson(person);
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async read() {
    try {
      const result = await this.personRepository.readPersons();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, person: Person) {
    try {
      const result = await this.personRepository.updatePerson(id, person);
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async delete(id: string) {
    try {
      const result = await this.personRepository.deletePerson(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
