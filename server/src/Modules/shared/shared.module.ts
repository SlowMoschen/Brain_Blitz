import { Global, Module } from '@nestjs/common';
import { AccessControlService } from './access-control/access-control.service';
import { EncryptionService } from './encryption/encryption.service';
import { TokenModule } from './token/token.module';
import { DatabaseModule } from './database/db.module';

@Global()
@Module({
	imports: [TokenModule],
	providers: [
		DatabaseModule,
		EncryptionService,
		AccessControlService,
	],
	exports: [
		EncryptionService,
		AccessControlService,
	],
})
export class SharedModule {}
