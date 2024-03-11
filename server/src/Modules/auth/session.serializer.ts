import { PassportSerializer } from '@nestjs/passport';
import { usersTable } from 'src/Models/users.model';
import { UsersService } from '../users/users.service';
import { Inject } from '@nestjs/common';

export class SessionSerializer extends PassportSerializer {
	constructor(@Inject(UsersService) private readonly usersService: UsersService) {
		super();
	}

	serializeUser(user: typeof usersTable, done: (err: Error, user: any) => void): void {
		done(null, user.id);
	}

	async deserializeUser(userId: string, done: (err: Error, payload: any) => void): Promise<void> {
		const user = await this.usersService.getCompleteUserById(userId);
		if (user instanceof Error) {
			done(user, null);
			return;
		}
		const { settings, id, ...rest } = user;
		done(null, { id: id, roles: [settings.roles] });
	}
}
