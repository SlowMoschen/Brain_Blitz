import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Modules/auth/auth.module';
import { QuizzesModule } from './Modules/quizzes/quizzes.module';
import { SharedModule } from './Modules/shared/shared.module';
import { UsersModule } from './Modules/users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './Guards/throttler.guard';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			}
		]),
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot(),
		SharedModule,
		AuthModule,
		UsersModule,
		QuizzesModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: CustomThrottlerGuard,
		},
	],
})
export class AppModule {}
