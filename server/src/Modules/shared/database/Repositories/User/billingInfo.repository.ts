import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../../../Models/_index';
import { SelectUserBillingInformation } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";

@Injectable()
export class BillingInfoRepository {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all billing information
     * @returns {Promise<SelectUserBillingInformation[] | [] | Error>} - Returns all billing information or an empty array if no billing information is found and an error if an error occurs
     */
    async queryAllBillingInfos(): Promise<SelectUserBillingInformation[] | [] | Error> {
        try {
            return await this.db.select().from(schema.usersBillingInformationTable);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a billing information by id
     * @param id - The id of the billing information
     * @returns {Promise<SelectUserBillingInformation | [] | Error>} - Returns a billing information or an empty array if no billing information is found and an error if an error occurs
     */
    async queryBillingInfoById(id: string): Promise<SelectUserBillingInformation | [] | Error> {
        try {
            return await this.db.query.usersBillingInformationTable.findFirst({
                where: eq(schema.usersBillingInformationTable.user_id, id)
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Inserts a new billing information into the database
     * @param {string} id - The id of the user
     * @returns {Promise<string | [] | Error>} - Returns the id of the user or null if an error occurs
     */
    async insertDefaultTable(id: string): Promise<string | [] | Error> {
        try {
            const billingInfo = await this.db
                .insert(schema.usersBillingInformationTable)
                .values({ user_id: id })
                .returning({ user_id: schema.usersBillingInformationTable.user_id });
            return billingInfo ? billingInfo[0].user_id : [];
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a billing information by id
     * @param id - The id of the billing information
     * @param body - The body of the request
     * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no billing information is found and an error if an error occurs
     */
    async updateBillingInfo(id: string, body: any): Promise<string | [] | Error> {
        try {
            const billingInfo = await this.db
                .update(schema.usersBillingInformationTable)
                .set(body)
                .where(eq(schema.usersBillingInformationTable.user_id, id))
                .returning({ user_id: schema.usersBillingInformationTable.user_id });
            return billingInfo ? billingInfo[0].user_id : [];
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Deletes a billing information by id
     * @param id - The id of the billing information
     * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no billing information is found and an error if an error occurs
     */
    async deleteBillingInfo(id: string): Promise<string | [] | Error> {
        try {
            const billingInfo = await this.db
                .delete(schema.usersBillingInformationTable)
                .where(eq(schema.usersBillingInformationTable.user_id, id))
                .returning({ user_id: schema.usersBillingInformationTable.user_id });
            return billingInfo ? billingInfo[0].user_id : [];
        } catch (error) {
            return error;
        }
    }
}