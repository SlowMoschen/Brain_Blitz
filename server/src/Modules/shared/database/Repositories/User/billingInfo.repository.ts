import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { SelectUserBillingInformation } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class BillingInfoRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * Queries the database for all billing information.
	 * @returns {Promise<SelectUserBillingInformation[]>} - Returns all billing information or throws a NotFoundException if no billing information is found.
	 */
	async findAll(): Promise<SelectUserBillingInformation[]> {
		const billingInfo = await this.db.select().from(schema.usersBillingInformationTable);
		if (billingInfo instanceof Error) throw billingInfo;
		if (billingInfo.length === 0) throw new NotFoundException('No billing info found');
		return billingInfo;
	}

	/**
	 * Queries the database for a billing information by id.
	 * @param id - The id of the billing information.
	 * @returns {Promise<SelectUserBillingInformation>} - Returns a billing information or throws a NotFoundException if no billing information is found.
	 */
	async findByID(id: string): Promise<SelectUserBillingInformation> {
		const billingInfo = await this.db.query.usersBillingInformationTable.findFirst({
			where: eq(schema.usersBillingInformationTable.user_id, id),
		});
		if (billingInfo instanceof Error) throw billingInfo;
		if (!billingInfo) throw new NotFoundException('No billing info found');
		return billingInfo;
	}

	/**
	 * Inserts a new billing information into the database.
	 * @param {string} id - The id of the user.
	 * @returns {Promise<string>} - Returns the id of the user or throws a NotFoundException if no billing information is found.
	 */
	async insertDefaultTable(id: string): Promise<string> {
		const billingInfo = await this.db
			.insert(schema.usersBillingInformationTable)
			.values({ user_id: id })
			.returning({ user_id: schema.usersBillingInformationTable.user_id });
		if (billingInfo instanceof Error) throw billingInfo;
		if (!billingInfo[0]) throw new NotFoundException('No billing info found');
		return billingInfo[0].user_id;
	}

	/**
	 * Updates a billing information by id.
	 * @param id - The id of the billing information.
	 * @param body - The body of the request.
	 * @returns {Promise<string>} - Returns the userID or throws a NotFoundException if no billing information is found.
	 */
	async updateOne(id: string, body: any): Promise<string> {
		const updatedBillingInfo = await this.db
			.update(schema.usersBillingInformationTable)
			.set(body)
			.where(eq(schema.usersBillingInformationTable.user_id, id))
			.returning({ user_id: schema.usersBillingInformationTable.user_id });
		if (updatedBillingInfo instanceof Error) throw updatedBillingInfo;
		if (!updatedBillingInfo[0]) throw new NotFoundException('No billing info found');

		return updatedBillingInfo[0].user_id;
	}

	/**
	 * Deletes a billing information by id.
	 * @param id - The id of the billing information.
	 * @returns {Promise<string>} - Returns the userID or throws a NotFoundException if no billing information is found.
	 */
	async deleteOne(id: string): Promise<string> {
		const deletedBillingInfo = await this.db
			.delete(schema.usersBillingInformationTable)
			.where(eq(schema.usersBillingInformationTable.user_id, id))
			.returning({ user_id: schema.usersBillingInformationTable.user_id });
		if (deletedBillingInfo instanceof Error) throw deletedBillingInfo;
		if (!deletedBillingInfo[0]) throw new NotFoundException('No billing info found');

		return deletedBillingInfo[0].user_id;
	}
}
