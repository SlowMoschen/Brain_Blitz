import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "../shared/user/user.service";
import { usersTable } from "src/Models/users.model";
import { Inject } from "@nestjs/common";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(UserService) private readonly userService: UserService) {
        super();
    }

    serializeUser(user: typeof usersTable, done: (err: Error, user: any) => void): void {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: (err: Error, payload: any) => void): Promise<void> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            done(new Error('User not found'), null);
        }
        done(null, user.id);
    }
}