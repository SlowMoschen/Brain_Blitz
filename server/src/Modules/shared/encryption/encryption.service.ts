import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenRepository } from '../database/Repositories/Token/token.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EncryptionService {
	private readonly saltRounds = 10;
	constructor(
		private readonly tokenRepo: TokenRepository,
		private readonly jwtService: JwtService,
	) {}

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, this.saltRounds);
	}

	async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(plainTextPassword, hashedPassword);
	}

	async generateToken(userID: string): Promise<string | Error> {
		const jwt = this.jwtService.sign({ userID });

		const token = {
			user_id: userID,
			token: jwt,
		};

		const insertedToken = await this.tokenRepo.insertToken(token);
		if (insertedToken instanceof Error) return insertedToken;

		return jwt;
	}

	async verifyToken(token: string): Promise<string | Error> {
		const tokenRows = await this.tokenRepo.getTokensByToken(token);
		if (tokenRows instanceof Error) return new Error('Token not found');

		const decodedPayload = this.jwtService.verify(token);
		const userID = tokenRows[0].user_id;

		if (decodedPayload.userID !== userID) return new Error('Token does not match user');

		return userID;
	}

    async deleteToken(token: string): Promise<string | Error> {
        const deletedToken = await this.tokenRepo.deleteToken(token);
        if (deletedToken instanceof Error) return deletedToken;

        return deletedToken;
    }

    async getTokensByUserId(userID: string): Promise<string[] | Error> {
        const tokens = await this.tokenRepo.getTokensByUserId(userID);
        if (tokens instanceof Error) return tokens;

        return tokens.map((token) => token.token);
    }
}
