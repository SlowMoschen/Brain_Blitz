import { Global, Module } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { DatabaseModule } from './database/db.module';
import { EncryptionModule } from './encryption/encryption.module';
import { ResponseHelperService } from './responseHelper.service';

@Global()
@Module({
	imports: [DatabaseModule, EncryptionModule],
	providers: [ResponseHelperService, AccessControlService],
	exports: [AccessControlService, ResponseHelperService, EncryptionModule, DatabaseModule],
})
export class SharedModule {}
