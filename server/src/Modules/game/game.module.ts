import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { GameService } from './game.service';

@Module({
	imports: [UsersModule, SharedModule],
	controllers: [],
	providers: [GameService],
	exports: [],
})
export class GameModule {}
