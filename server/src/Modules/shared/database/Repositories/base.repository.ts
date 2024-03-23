import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import * as schema from '../../../../Models/_index';

export abstract class IGenericRepository<T> {
	abstract findAll(): Promise<T[]>;
	abstract findOne(id: string): Promise<T>;
	abstract create(body: T): Promise<T>;
	abstract update(body: T): Promise<T>;
	abstract delete(id: string): Promise<boolean>;
}

export class BaseRepository<T> implements IGenericRepository<T> {
	private readonly _table: PgTableWithColumns<T extends TableConfig ? TableConfig : never>;

    constructor(
        @InjectDatabase() private readonly _db: NodePgDatabase<typeof schema>,
        table: PgTableWithColumns<T extends TableConfig ? TableConfig : never>,
    ) {
        this._table = table;
    }

    async findAll(): Promise<T[]> {
        const result = await this._db.select().from(this._table);
        if (result instanceof Error) throw result;
        if (!result) return null;
        return result as T[];
    }

    async findOne(id: string): Promise<T> {
        return null;
    }

    async create(body: T): Promise<T> {
        return null;
    }

    async update(body: T): Promise<T> {
        return null;
    }

    async delete(id: string): Promise<boolean> {
        return null;
    }
}
