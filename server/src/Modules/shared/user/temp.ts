// /**
// 	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the app_states table or null if an error occurs or no user is found
// 	 */
// async queryUserWithAppStatesById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 app_states: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }

// /**
//  * @returns {Promise<SelectUser[] | null>} - Returns a user with only the billing_information table or null if an error occurs or no user is found
//  */
// async queryUserWithBillingInformationById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 billing_information: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }

// /**
//  * @returns {Promise<SelectUser[] | null>} - Returns a user with only the settings table or null if an error occurs or no user is found
//  */
// async queryUserWithSettingsById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 settings: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }

// /**
//  * @returns {Promise<SelectUser[] | null>} - Returns a user with only the statistics table or null if an error occurs or no user is found
//  */

// async queryUserWithStatisticsById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 statistics: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }

// /**
//  * @returns {Promise<SelectUser[] | null>} - Returns a user with only the timestamps table or null if an error occurs or no user is found
//  */
// async queryUserWithTimestampsById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 timestamps: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }

// /**
//  * @returns {Promise<SelectUser[] | null>} - Returns a user with only the tokens table or null if an error occurs or no user is found
//  */
// async queryUserWithTokensById(id: string): Promise<SelectUser | null> {
//     try {
//         const user = await this.db.query.usersTable.findFirst({
//             where: eq(schema.usersTable.id, id),
//             with: {
//                 tokens: true,
//             },
//         });

//         if (!user) return null;
//         return user;
//     } catch (error) {
//         return error;
//     }
// }