import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('BASE_HOST'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  port: configService.get('POSTGRESS_HOST_PORT'),
  entities: ['./src/**/*entity/*.ts'],
  migrations: ['./src/modules/database/migrations/*.ts'],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
