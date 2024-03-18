import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { TimestampsRepository } from "./database/Repositories/User/timestamps.repository";
import { UserLogEvent } from "src/Events/user.events";

@Injectable()
export class TimestampService {
    constructor(private readonly timestampRepository: TimestampsRepository) {}


    @OnEvent('user.login')
    handleUserLoginEvent({ user_id }: UserLogEvent) {
        return this.timestampRepository.updateOneColumn(user_id, 'last_login');
    }

    @OnEvent('user.logout')
    handleUserLogoutEvent({ user_id }: UserLogEvent) {
        return this.timestampRepository.updateOneColumn(user_id, 'last_logout');
    }
}