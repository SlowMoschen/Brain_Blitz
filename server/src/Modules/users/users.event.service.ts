import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserLogEvent } from 'src/Events/user.events';
import { UsersService } from './users.service';
import { stat } from 'fs';

@Injectable()
export class UsersEventService {
	constructor(
		private readonly usersService: UsersService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * @description - Updates the user's login statistics
	 * if it has been more than 24 hours since the last login the login streak will increment - if it has been more than 48 hours the login streak will reset
	 * @param {UserLogEvent} - The user login event
	 */
	@OnEvent('user.login')
	async handleUserLoginEvent({ user_id }: UserLogEvent) {
		const timestamps = await this.usersService.getTimeStamps(user_id);
		const statistics = await this.usersService.getStatistics(user_id);

		const lastLogin = new Date(timestamps.last_login).getTime();
		const currentTime = new Date().getTime();
		const timeSinceLastLoginInHours = (currentTime - lastLogin) / 1000 / 60 / 60;
		const twentyFourHours = 24;
		const fortyEightHours = 48;

		// If the user has not logged in for more than 48 hours the login streak will reset
		// If the streak is 0 (user has never logged in before) the streak will be set to 1 (as the user has now logged in for the first time)
		if (timeSinceLastLoginInHours > fortyEightHours || statistics.login_streak === 0) {
			statistics.login_streak = 1;
		}

		// If the user has logged
		if (timeSinceLastLoginInHours > twentyFourHours) {
			const newStreak = statistics.login_streak + 1;
			if (newStreak > statistics.max_login_streak) statistics.max_login_streak = newStreak;
			statistics.login_streak = newStreak;
		}
		await this.usersService.updateStatistics(user_id, statistics);
		this.eventEmitter.emit('time.login', { user_id });
	}
}
