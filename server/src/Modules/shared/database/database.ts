import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { DB_CONNECTION } from 'src/Utils/constants';
import * as schema from '../../../Models/_index';

export const databaseProvider: Provider = {
	provide: DB_CONNECTION,
	inject: [ConfigService],
	useFactory: async (configService: ConfigService): Promise<NodePgDatabase<typeof schema>> => {
		const DB_URL =
			configService.get<string>('NODE_ENV') === 'production'
				? configService.get<string>('DATABASE_URL')
				: configService.get<string>('DATABASE_DEV_URL');
		const client = new Client({
			connectionString: DB_URL,
		});
        await client.connect();
        const db = drizzle(client, { schema });
		return db;
	},
};
