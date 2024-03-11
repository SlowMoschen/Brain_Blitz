import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import * as schema from '../../../../../Models/_index';
import { SelectToken } from 'src/Utils/Types/model.types';
import { eq } from 'drizzle-orm';

@Injectable()
export class TokenRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Gets all tokens from the database
     * @returns {Promise<SelectToken[] | [] | Error>} - Returns all tokens
     */
	async getAllTokens(): Promise<SelectToken[] | [] | Error> {
		try {
			const tokens = await this.db.select().from(schema.tokensTable);
			return tokens;
		} catch (error) {
			return error;
		}
	}

    /**
     * @description - Gets all tokens from the database by user id
     * @param {string} userID - The user's id
     * @returns {Promise<SelectToken[] | [] | Error>} - Returns all tokens
     */
	async getTokensByUserId(userID: string): Promise<SelectToken[] | Error> {
		try {
			const token = await this.db.query.tokensTable.findMany({
				where: eq(schema.tokensTable.user_id, userID),
			});
			return token;
		} catch (error) {
			return error;
		}
	}


    /**
     * @description - Gets all tokens from the database by token
     * @param {string} token - The token
     * @returns {Promise<SelectToken[] | [] | Error>} - Returns all tokens
     */
	async getTokensByToken(token: string): Promise<SelectToken[] | Error> {
		try {
			const tokenRow = await this.db.query.tokensTable.findMany({
				where: eq(schema.tokensTable.token, token),
			});
			return tokenRow;
		} catch (error) {
			return error;
		}
	}

    /**
     * @description - Inserts a token into the database
     * @param {object} token - The token
     * @returns {Promise<string | Error>} - Returns the token
     */
	async insertToken(token: { user_id: string; token: string }): Promise<string | Error> {
		try {
			const insertedToken = await this.db
				.insert(schema.tokensTable)
				.values(token)
				.returning({ token: schema.tokensTable.token });
			return insertedToken[0].token;
		} catch (error) {
			return error;
		}
	}

    /**
     * @description - Deletes a token from the database
     * @param {string} token - The token
     * @returns {Promise<string | Error>} - Returns the token
     */
	async deleteToken(token: string): Promise<string | Error> {
		try {
			const deletedToken = await this.db
				.delete(schema.tokensTable)
				.where(eq(schema.tokensTable.token, token))
				.returning({ token: schema.tokensTable.token });
			return deletedToken[0].token;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Deletes all tokens from the database by user id
	 * @param {string} userID - The user's id
	 * @returns {Promise<string | Error>} - Returns the user's id
	 */
	async deleteTokensByUserId(userID: string): Promise<string | Error> {
		try {
			const deletedTokens = await this.db
				.delete(schema.tokensTable)
				.where(eq(schema.tokensTable.user_id, userID))
				.returning({ user_id: schema.tokensTable.user_id });
			return deletedTokens[0].user_id;
		} catch (error) {
			return error;
		}
	}
}
