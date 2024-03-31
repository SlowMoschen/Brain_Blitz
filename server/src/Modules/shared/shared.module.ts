import { Global, Module } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { DatabaseModule } from './database/db.module';
import { EncryptionModule } from './encryption/encryption.module';
import { TimestampService } from './timestamp.service';
import { StringModule } from './string-manipulation/string.module';

@Global()
@Module({
	imports: [DatabaseModule, EncryptionModule, StringModule],
	providers: [AccessControlService, TimestampService],
	exports: [TimestampService, AccessControlService, EncryptionModule, DatabaseModule, StringModule],
})
export class SharedModule {}
