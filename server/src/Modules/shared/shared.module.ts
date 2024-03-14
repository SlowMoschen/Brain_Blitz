import { Global, Module } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { DatabaseModule } from './database/db.module';
import { EncryptionModule } from './encryption/encryption.module';

@Global()
@Module({
	imports: [DatabaseModule, EncryptionModule],
	providers: [AccessControlService],
	exports: [AccessControlService, EncryptionModule, DatabaseModule],
})
export class SharedModule {}
