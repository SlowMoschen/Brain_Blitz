import { Global, Module } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { DatabaseModule } from './database/db.module';
import { EncryptionModule } from './encryption/encryption.module';
import { TimestampService } from './timestamp.service';

@Global()
@Module({
	imports: [DatabaseModule, EncryptionModule],
	providers: [AccessControlService, TimestampService],
	exports: [TimestampService, AccessControlService, EncryptionModule, DatabaseModule],
})
export class SharedModule {}
