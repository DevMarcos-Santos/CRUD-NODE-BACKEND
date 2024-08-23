import { Module } from '@nestjs/common';
import { PersonController } from './controller/personController';
import { PersonService } from './service/personService';
import { PersonRepository } from './repository/personRepository';
import { PrismaService } from './database/prisma.service';
import { Validations } from './service/validations';

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository, PrismaService, Validations],
})
export class AppModule {}
