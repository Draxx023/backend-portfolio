import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../config/config.json';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      ...config.database,
      entities: [User],
    }),
  ],
})
export class DatabaseModule {}
