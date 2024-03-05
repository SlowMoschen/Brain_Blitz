import { Module } from '@nestjs/common';
import { databaseProvider } from './database/database';
import { DB_CONNECTION } from 'src/Utils/constants';
import { UserService } from './user/user.service';
import { EncryptionService } from './encryption/encryption.service';

@Module({

  providers: [databaseProvider, UserService, EncryptionService],
  exports: [DB_CONNECTION, UserService, EncryptionService],
})
export class SharedModule {}
