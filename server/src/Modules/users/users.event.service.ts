import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserLogEvent } from 'src/Events/user.events';
import { UsersService } from './users.service';
import { stat } from 'fs';
import { updates } from '../gateway/updates';
import { UpdateNotificationEvent } from 'src/Events/notification.events';

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
		const notificationDelay = 1000;
		const timestamps = await this.usersService.getTimeStamps(user_id);
		const statistics = await this.usersService.getStatistics(user_id);

		const isFirstLogin = statistics.login_streak === 0;
		// const lastLogin = new Date(timestamps.last_login).getTime();
		const lastLogin = new Date('2024-04-20').getTime();
		const currentTime = new Date().getTime();
		const timeSinceLastLoginInHours = (currentTime - lastLogin) / 1000 / 60 / 60;
		const twentyFourHours = 24;
		const fortyEightHours = 48;

		if (timeSinceLastLoginInHours > twentyFourHours) {
			const loginStreak = timeSinceLastLoginInHours > fortyEightHours ? 1 : statistics.login_streak + 1;
			statistics.login_streak = loginStreak;
			if (loginStreak > statistics.max_login_streak) {
				statistics.max_login_streak = loginStreak;
			}
		}

		await this.usersService.updateStatistics(user_id, statistics);

		setTimeout(() => {
			if (isFirstLogin) {
				this.eventEmitter.emit('notification.firstLogin', new UserLogEvent(user_id));
			}

			for (const update of updates) {
				if (lastLogin < update.date) {
					this.eventEmitter.emit('notification.update', new UpdateNotificationEvent(user_id, update));
				}
			}
		}, notificationDelay);

		this.eventEmitter.emit('time.login', new UserLogEvent(user_id));
	}
}
