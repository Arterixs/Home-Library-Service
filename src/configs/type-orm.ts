import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user';

export const configTypeORM = {
  type: 'postgres',
  name: 'vasya',
  host: 'localhost',
  port: 5432,
  username: 'Tommy',
  password: '123456',
  database: 'User',
  entities: [User],
  synchronize: false,
} as TypeOrmModuleOptions;
