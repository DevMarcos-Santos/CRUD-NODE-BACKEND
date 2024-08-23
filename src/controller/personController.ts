import { Body, Controller, Post, Res } from '@nestjs/common';
import { PersonService } from 'src/service/personService';
import { Response } from 'express';
import { Person } from 'src/types/types';

@Controller()
export class PersonController {
  personService = new PersonService();

  @Post('create')
  async create(@Body() body: Person, @Res() res: Response) {
    try {
      const result = await this.personService.create(body.name, body.email);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
