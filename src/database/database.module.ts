import { Global, Module } from '@nestjs/common';
import { User } from 'src/user/user.validation';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
