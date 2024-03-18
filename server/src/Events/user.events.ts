export class UserCreatedEvent {
    constructor(
        public readonly user_id: string,
    ) {}
}

export class UserLogEvent {
    constructor(
        public readonly user_id: string,
    ) {}
}