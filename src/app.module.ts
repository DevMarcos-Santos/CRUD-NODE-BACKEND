import { Module } from '@nestjs/common';
import { PersonController } from './controller/personController';
import { PersonService } from './service/personService';
import { PersonRepository } from './repository/personRepository';

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
})
export class AppModule {}
