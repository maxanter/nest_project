import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  private persons: Person[] = [];
  private maxId: number = 0;

  onModuleInit() {
    this.persons.push({ id: ++this.maxId, firstName: "Łukasz", lastName: "Kąśliwy"});
    this.persons.push({ id: ++this.maxId, firstName: "Marek", lastName: "Nowak"});
    this.persons.push({ id: ++this.maxId, firstName: "Zenon", lastName: "Zawada"});
  }

  create(createPersonDto: CreatePersonDto): Person {
    this.maxId++;

    const newPerson: Person = {
      id: this.maxId, 
      firstName: createPersonDto.firstName, 
      lastName: createPersonDto.lastName,
    };

    this.persons.push(newPerson); 

    return newPerson;
  }

  
  private findIndexIfExists(id: number): number {
    const index = this.persons.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`No person with ID ${id}.`);
    }

    return index;
  }


  findAll(): Person[] {
    return this.persons;
  }

  findOne(id: number): Person {
    const idx = this.findIndexIfExists(id);
    return this.persons[idx];
  }
  
  update(id: number, updatePersonDto: UpdatePersonDto): Person {
    const idx = this.findIndexIfExists(id);
    const updatedPerson = { ...this.persons[idx], ...updatePersonDto };
    this.persons[idx] = updatedPerson;
    return updatedPerson;
  }
  
  remove(id: number): void {
    const idx = this.findIndexIfExists(id);
    this.persons.splice(idx, 1);
  }
  
}
