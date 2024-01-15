
import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async add(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    return this.usersRepository.save(newUser);
  }

  findOne(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
  
}
