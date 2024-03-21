import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Modules/auth/auth.module';
import { QuizzesModule } from './Modules/quizzes/quizzes.module';
import { SharedModule } from './Modules/shared/shared.module';
import { UsersModule } from './Modules/users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ThrottlerModule.forRoot([{
			ttl: 60,
			limit: 10,
		}]),
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot(),
		SharedModule,
		AuthModule,
		UsersModule,
		QuizzesModule,
	],
})
export class AppModule {}
