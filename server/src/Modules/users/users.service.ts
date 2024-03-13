import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../shared/database/Repositories/User/_user.repository';
import { SelectUser, SelectUserBillingInformation, SelectUserSettings, SelectUserStatistics, SelectUserWithAllTables, SelectUserWithoutPassword } from 'src/Utils/Types/model.types';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { UpdateUserBillingInfoDTO } from './dto/update-user-billingInfo.dto';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';

@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UserRepository) {}

	async getUserByEmail(email: string): Promise<SelectUserWithoutPassword | [] | Error> {
		const user = await this.userRepo.getUserByEmailWithAllTables(email);
		if (!user) return new NotFoundException('User not found');
		if (user instanceof Error) return new Error(user.message);

		// exclude password from response
		const { password, ...rest } = user[0];

		return rest;
	}

	async getUserById(id: string): Promise<SelectUserWithoutPassword | [] | Error> {
		const user = await this.userRepo.getUserById(id);
		if (!user) return new NotFoundException('User not found');
		if (user instanceof Error) return new Error(user.message);

		// exclude password from response
		const { password, ...rest } = user[0];

		return rest;
	}

    async getCompleteUserById(id: string): Promise<SelectUserWithAllTables | Error> {
        const user = await this.userRepo.getUserByIdWithAllTables(id);
        if (!user) return new NotFoundException('User not found');
        if (user instanceof Error) return new Error(user.message);

        return user as SelectUserWithAllTables;
    }

    async getCompleteUserByEmail(email: string): Promise<SelectUserWithAllTables | Error> {
		const user = await this.userRepo.getUserByEmailWithAllTables(email);
        if (user instanceof Error) return new Error(user.message);
        if (!user) return new NotFoundException('E-mail konnte nicht gefunden werden');
		
        return user as SelectUserWithAllTables;
    }

	async getAllUsers(): Promise<SelectUserWithoutPassword[] | Error> {
		const users = await this.userRepo.getAllUsersWithAllTables();
		if (!users) return new NotFoundException('No users found');
		if (users instanceof Error) return new Error(users.message);

		// exclude password from response
		const usersWithoutPassword = users.map((user) => {
			const { password, ...rest } = user;
			return rest;
		});

		return usersWithoutPassword;
	}

    async getBillingInfo(id: string): Promise<SelectUserBillingInformation | [] | Error> {
        const billingInfo = await this.userRepo.getBillingInfo(id);
        if (!billingInfo) return new NotFoundException('No billing info found');
        if (billingInfo instanceof Error) return new Error(billingInfo.message);

        return billingInfo;
    }

    async getStatistics(id: string): Promise<SelectUserStatistics | [] | Error> {
        const statistics = await this.userRepo.getStatistics(id);
        if (!statistics) return new NotFoundException('No statistics found');
        if (statistics instanceof Error) return new Error(statistics.message);

        return statistics;
    }

    async getSettings(id: string): Promise<SelectUserSettings | [] | Error> {
        const settings = await this.userRepo.getSettings(id);
        if (!settings) return new NotFoundException('No settings found');
        if (settings instanceof Error) return new Error(settings.message);

        return settings;
    }

	async createNewUser(body: CreateUserDTO): Promise<SelectUser | Error> {
		const user = await this.userRepo.insertNewUser(body);
		if (user instanceof Error) return new Error(user.message);
		if (!user || typeof user !== 'object') return new Error('User creation failed');

		return user as SelectUser;
	}

	async insertNewUnlockedQuiz(id: string, quizId: string): Promise<string | [] | Error> {
		const user = await this.userRepo.insertNewUnlockedQuiz(id, quizId);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async insertNewUnlockedAchievement(id: string, achievementId: string): Promise<string | [] | Error> {
		const user = await this.userRepo.insertNewUnlockedAchievement(id, achievementId);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async insertNewCompletedQuiz(id: string, quizId: string): Promise<string | [] | Error> {
		const user = await this.userRepo.insertNewCompletedQuiz(id, quizId);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async insertNewHighscore(id: string, quizId: string, score: number): Promise<string | [] | Error> {
		const user = await this.userRepo.insertNewHighscore(id, quizId, score);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async updateUserCredentials(id: string, body: CreateUserDTO): Promise<string | [] | Error> {
		const user = await this.userRepo.updateUserCredentials(id, body);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async updateBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string | [] | Error> {
		const user = await this.userRepo.updateBillingInfo(id, body);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async updateSettings(id: string, body: UpdateUserSettingsDTO): Promise<string | [] | Error> {
		const user = await this.userRepo.updateSettings(id, body);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

    async setVerificationStatus(id: string, status: boolean): Promise<string | Error> {
        const user = await this.userRepo.setVerificationStatus(id, status);
        if (user instanceof Error) return new Error(user.message);

        return user;
    
    }

	async updateStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string | [] | Error> {
		const user = await this.userRepo.updateStatistics(id, body);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}

	async deleteUser(id: string): Promise<string | [] | Error> {
		const user = await this.userRepo.deleteUserById(id);
		if (user instanceof Error) return new Error(user.message);

		return user;
	}
}
