import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import * as schema from '../../../Models/_index';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';

@Injectable()
export class TokenService {
	constructor(
		@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
		private readonly jwtService: JwtService,
	) {}

    async generateToken(userID: string): Promise<string> {
        const jwt = this.jwtService.sign({ userID });
        const token = {
            user_id: userID,
            token: jwt,
        };
        const insertedToken = await this.db.insert(schema.tokensTable).values(token).execute();
        if (!insertedToken) return null;
        return jwt;
    }

    async verifyToken(token: string): Promise<{ userID: string }> {
        const tokenRow = await this.db.query.tokensTable.findFirst({
            where: eq(schema.tokensTable.token, token),
        });
        if (!tokenRow) return null;

        const decodedToken = this.jwtService.verify(tokenRow.token);
        return decodedToken;
    }

    async deleteToken(token: string): Promise<string> {
        const deletedToken = await this.db
            .delete(schema.tokensTable)
            .where(eq(schema.tokensTable.token, token))
            .returning({ token: schema.tokensTable.token });
        if (!deletedToken) return null;
        return deletedToken[0].token;
    }
}
