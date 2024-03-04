import { Module } from '@nestjs/common';
import { databaseProvider } from './database/database';
import { DB_CONNECTION } from 'src/Utils/constants';

@Module({

  providers: [databaseProvider],
  exports: [DB_CONNECTION],
})
export class SharedModule {}
