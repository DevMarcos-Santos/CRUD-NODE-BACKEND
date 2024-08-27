import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PersonService } from 'src/service/personService';
import { Response } from 'express';
import { Person } from 'src/types/types';
import { string } from 'zod';

@Controller('persons')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post('create')
  async create(@Body() body: Person, @Res() res: Response) {
    try {
      const result = await this.personService.create(body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Get('')
  async read(@Res() res: Response) {
    try {
      const result = await this.personService.read();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  @Get(':id')
  async readById(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.personService.readById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Person,
    @Res() res: Response,
  ) {
    try {
      const result = await this.personService.update(id, body);
      return res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.personService.delete(id);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
