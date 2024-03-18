import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../shared/database/Repositories/User/_user.repository';
import {
	SelectUser,
	SelectUserBillingInformation,
	SelectUserSettings,
	SelectUserStatistics,
	SelectUserWithAllTables,
	SelectUserWithoutPassword,
} from 'src/Utils/Types/model.types';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { UpdateUserBillingInfoDTO } from './dto/update-user-billingInfo.dto';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUserByID(id: string): Promise<SelectUserWithAllTables | Error> {
		const user = await this.userRepository.findByID(id);
		if (!user) return new NotFoundException('User not found');
		if (user instanceof Error) return user;

		const { password, ...rest } = user;

		return rest as SelectUserWithAllTables;
	}

	async getUserByEmail(email: string): Promise<SelectUserWithAllTables | Error> {
		const user = await this.userRepository.findByEmail(email);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new NotFoundException('User not found');

		return user as SelectUserWithAllTables;
	}

	async getAllUsers(): Promise<SelectUserWithoutPassword[] | Error> {
		const users = await this.userRepository.findAll();
		if (users instanceof Error) return new Error(users.message);
		if (users.length === 0) return new NotFoundException('No users found');

		// exclude password from response
		const usersWithoutPassword = users.map((user) => {
			const { password, ...rest } = user;
			return rest;
		});

		return usersWithoutPassword;
	}

	async getBillingInfo(id: string): Promise<SelectUserBillingInformation | Error> {
		const billingInfo = await this.userRepository.findOneBillingInfo(id);
		if (!billingInfo) return new NotFoundException('No billing info found');
		if (billingInfo instanceof Error) return new Error(billingInfo.message);

		return billingInfo;
	}

	async getStatistics(id: string): Promise<SelectUserStatistics | Error> {
		const statistics = await this.userRepository.findOneStats(id);
		if (!statistics) return new NotFoundException('No statistics found');
		if (statistics instanceof Error) return new Error(statistics.message);

		return statistics;
	}

	async getSettings(id: string): Promise<SelectUserSettings | Error> {
		const settings = await this.userRepository.findOneSettings(id);
		if (!settings) return new NotFoundException('No settings found');
		if (settings instanceof Error) return new Error(settings.message);

		return settings;
	}

	async createNewUser(body: CreateUserDTO): Promise<SelectUser | Error> {
		const user = await this.userRepository.insertOne(body);
		if (user instanceof Error) return new Error(user.message);
		if (!user || typeof user !== 'object') return new Error('User creation failed');

		return user as SelectUser;
	}

	async insertNewUnlockedQuiz(id: string, quizId: string): Promise<string | Error> {
		const user = await this.userRepository.insertNewUnlockedQuiz(id, quizId);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async insertNewUnlockedAchievement(id: string, achievementId: string): Promise<string | Error> {
		const user = await this.userRepository.insertNewUnlockedAchievement(id, achievementId);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async insertNewCompletedQuiz(id: string, quizId: string): Promise<string | Error> {
		console.log('UserService');
		const user = await this.userRepository.insertNewCompletedQuiz(id, quizId);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async insertNewHighscore(id: string, quizId: string, score: number): Promise<string | Error> {
		const user = await this.userRepository.insertNewHighscore(id, quizId);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async updateUserCredentials(id: string, body: CreateUserDTO): Promise<string | Error> {
		const user = await this.userRepository.updateOneCredentials(id, body);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async updateBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string | Error> {
		const user = await this.userRepository.updateOneBillingInfo(id, body);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async updateSettings(id: string, body: UpdateUserSettingsDTO): Promise<string | Error> {
		const user = await this.userRepository.updateOneSettings(id, body);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async setVerificationStatus(id: string, status: boolean): Promise<string | Error> {
		const user = await this.userRepository.setVerificationStatus(id, status);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async updateStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string | Error> {
		const user = await this.userRepository.updateOneStats(id, body);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User update failed');

		return user;
	}

	async deleteUser(id: string): Promise<string | Error> {
		const user = await this.userRepository.deleteOneByID(id);
		if (user instanceof Error) return new Error(user.message);
		if (!user) return new Error('User deletion failed');

		return user;
	}
}
