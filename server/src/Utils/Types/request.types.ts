import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			logout?: (cb: (err: Error) => void) => void;
			user?: {
				id: string;
				roles: string[];
			};
		}
	}
}

export type UserKeys = keyof Express.Request['user'];
