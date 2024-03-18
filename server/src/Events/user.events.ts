export class UserCreatedEvent {
    constructor(
        public readonly user_id: string,
    ) {}
}