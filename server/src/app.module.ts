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
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { RankingsModule } from './Modules/rankings/rankings.module';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 25,
			}
		]),
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot(),
		ScheduleModule.forRoot(),
		SharedModule,
		AuthModule,
		UsersModule,
		QuizzesModule,
		RankingsModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: CustomThrottlerGuard,
		},
	],
	controllers: [AppController],
})
export class AppModule {}
