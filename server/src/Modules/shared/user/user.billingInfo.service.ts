import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../Models/_index';
import { SelectUserBillingInformation } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";
import { UpdateUserBillingInfoDTO } from "src/Modules/users/dto/update-user-billingInfo.dto";

@Injectable()
export class BillingInfoService {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all billing information
     * @returns {Promise<SelectUserBillingInformation[] | null | Error>} - Returns all billing information or null if an error occurs or no billing information is found
     */
    async getAllBillingInfos(): Promise<SelectUserBillingInformation[] | null | Error> {
        try {
            const billingInfos = await this.db.select().from(schema.usersBillingInformationTable);
            if (!billingInfos) return null;
            return billingInfos;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a billing information by id
     * @param id - The id of the billing information
     * @returns {Promise<SelectUserBillingInformation | null | Error>} - Returns a billing information or null if an error occurs or no billing information is found
     */

    async getBillingInfoById(id: string): Promise<SelectUserBillingInformation | null | Error> {
        try {
            const billingInfo = await this.db.query.usersBillingInformationTable.findFirst({
                where: eq(schema.usersBillingInformationTable.user_id, id)
            });
            if (!billingInfo) return null;
            return billingInfo;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a billing information by id
     * @param id - The id of the billing information
     * @param body - The body of the request
     * @returns {Promise<string | null | Error>} - Returns the userID or null if an error occurs or no billing information is found
     */
    async updateBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string | null | Error> {
        try {
            const billingInfo = await this.db
                .update(schema.usersBillingInformationTable)
                .set(body)
                .where(eq(schema.usersBillingInformationTable.user_id, id))
                .returning({ user_id: schema.usersBillingInformationTable.user_id });
            if (!billingInfo) return null;
            return billingInfo[0].user_id;
        } catch (error) {
            return error;
        }
    }
}