import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { LocalStrategy } from 'src/Strategies/local.strategry';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from '../shared/token/token.module';
import { MailModule } from '../mail/mail.module';

@Module({
	imports: [MailModule, TokenModule, SharedModule, PassportModule.register({ session: true })],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}
