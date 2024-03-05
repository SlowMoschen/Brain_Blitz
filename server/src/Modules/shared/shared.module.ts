import { Module } from '@nestjs/common';
import { databaseProvider } from './database/database';
import { DB_CONNECTION } from 'src/Utils/constants';
import { UserService } from './user/user.service';
import { EncryptionService } from './encryption/encryption.service';
import { UsersSettingsService } from './user/user.settings.service';

@Module({

  providers: [databaseProvider, UserService, EncryptionService, UsersSettingsService],
  exports: [DB_CONNECTION, UserService, EncryptionService, UsersSettingsService],
})
export class SharedModule {}
