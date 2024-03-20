import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { databaseProvider } from '../database/database.provider';
import { DatabaseModule } from '../database/db.module';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
			inject: [ConfigService],
		}),
		DatabaseModule,
	],
	providers: [databaseProvider, EncryptionService],
	exports: [EncryptionService],
})
export class EncryptionModule {}
