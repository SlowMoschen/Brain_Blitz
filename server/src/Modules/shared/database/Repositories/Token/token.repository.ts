import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { SelectToken } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class TokenRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Gets all tokens from the database
     * @returns {Promise<SelectToken[]>} - Returns all tokens
     */
	async getAllTokens(): Promise<SelectToken[]> {
		const tokens = await this.db.select().from(schema.tokensTable);
		if (tokens instanceof Error) throw tokens;
		if (tokens.length === 0) throw new NotFoundException('No tokens found');
		return tokens;
	}

    /**
     * @description - Gets all tokens from the database by user id
     * @param {string} userID - The user's id
     * @returns {Promise<SelectToken[]>} - Returns all tokens
     */
	async getTokensByUserId(userID: string): Promise<SelectToken[]> {
		const tokens = await this.db.query.tokensTable.findMany({
			where: eq(schema.tokensTable.user_id, userID),
		});
		if (tokens instanceof Error) throw tokens;
		if (tokens.length === 0) throw new NotFoundException('No tokens found');
		return tokens;
	}


    /**
     * @description - Gets all tokens from the database by token
     * @param {string} token - The token
     * @returns {Promise<SelectToken[]>} - Returns all tokens
     */
	async getTokensByToken(token: string): Promise<SelectToken[]> {
		const tokens = await this.db.query.tokensTable.findMany({
			where: eq(schema.tokensTable.token, token),
		});
		if (tokens instanceof Error) throw tokens;
		if (tokens.length === 0) throw new NotFoundException('No tokens found');
		return tokens;
	}

    /**
     * @description - Inserts a token into the database
     * @param {object} token - The token
     * @returns {Promise<string>} - Returns the token
     */
	async insertToken(token: { user_id: string; token: string }): Promise<string> {
		const insertedToken = await this.db.insert(schema.tokensTable).values(token).returning({ token: schema.tokensTable.token });
		if (insertedToken instanceof Error) throw insertedToken;
		if (!insertedToken[0]) throw new NotImplementedException('Token not inserted');
		return insertedToken[0].token;
	}

    /**
     * @description - Deletes a token from the database
     * @param {string} token - The token
     * @returns {Promise<string>} - Returns the token
     */
	async deleteToken(token: string): Promise<string> {
		const deletedToken = await this.db.delete(schema.tokensTable).where(eq(schema.tokensTable.token, token)).returning({ token: schema.tokensTable.token });
		if (deletedToken instanceof Error) throw deletedToken;
		if (!deletedToken[0]) throw new NotFoundException('Token not found');
		return deletedToken[0].token;
	}

	/**
	 * @description - Deletes all tokens from the database by user id
	 * @param {string} userID - The user's id
	 * @returns {Promise<string>} - Returns the user's id
	 */
	async deleteTokensByUserId(userID: string): Promise<string> {
		const deletedToken = await this.db.delete(schema.tokensTable).where(eq(schema.tokensTable.user_id, userID));
		if (deletedToken instanceof Error) throw deletedToken;
		if (!deletedToken) throw new NotFoundException('Token not found');
		return userID;
	}
}
