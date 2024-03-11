import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../../../Models/_index';
import { SelectUserAppState } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";

@Injectable()
export class AppStateRepository {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all app state
     * @returns {Promise<SelectUserAppState[] | [] | Error>} - Returns all app state or an empty array if no app state is found and an error if an error occurs
     */
    async queryAllAppStates(): Promise<SelectUserAppState[] | [] | Error> {
        try {
            return await this.db.select().from(schema.usersAppStates);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a app state by id
     * @param id - The id of the app state
     * @returns {Promise<SelectUserAppState | [] | Error>} - Returns a app state or an empty array if no app state is found and an error if an error occurs
     */
    async queryAppStateById(id: string): Promise<SelectUserAppState | [] | Error> {
        try {
            return await this.db.query.usersAppStates.findFirst({
                where: eq(schema.usersAppStates.user_id, id)
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a app state by id
     * @param id - The id of the app state
     * @param body - The body of the request
     * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no app state is found and an error if an error occurs
     */
    async updateAppState(id: string, body: any): Promise<string | [] | Error> {
        try {
            const appState = await this.db
                .update(schema.usersAppStates)
                .set(body)
                .where(eq(schema.usersAppStates.user_id, id))
                .returning({ user_id: schema.usersAppStates.user_id });
            return appState ? appState[0].user_id : [];
        } catch (error) {
            return error;
        }
    }
}