import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../shared/database/Repositories/User/_user.repository';
import {
	SelectUser,
	SelectUserBillingInformation,
	SelectUserSettings,
	SelectUserStatistics,
	SelectUserStatisticsWithUser,
	SelectUserTimestamps,
	SelectUserWithAllTables,
	SelectUserWithoutPassword,
} from 'src/Utils/Types/model.types';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { UpdateUserBillingInfoDTO } from './dto/update-user-billingInfo.dto';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { SendVerifyMailEvent } from 'src/Events/notification.events';

@Injectable()
export class UsersService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly eventEmitter: EventEmitter2,
		private readonly encryptionService: EncryptionService,
	) {}

	async getUserByID(id: string): Promise<SelectUserWithAllTables> {
		const user = await this.userRepository.findByID(id);
		return user as SelectUserWithAllTables;
	}

	async getUserByEmail(email: string): Promise<SelectUserWithAllTables> {
		const user = await this.userRepository.findByEmail(email);
		return user as SelectUserWithAllTables;
	}

	async getAllUsers(): Promise<SelectUserWithoutPassword[]> {
		const users = await this.userRepository.findAll();
		return users;
	}

	async getBillingInfo(id: string): Promise<SelectUserBillingInformation> {
		return await this.userRepository.findOneBillingInfo(id);
	}

	async getAllStatistics(): Promise<SelectUserStatisticsWithUser[]> {
		return await this.userRepository.findAllStatistics();
	}

	async getStatistics(id: string): Promise<SelectUserStatistics> {
		return await this.userRepository.findOneStats(id);
	}

	async getSettings(id: string): Promise<SelectUserSettings> {
		return await this.userRepository.findOneSettings(id);
	}

	async getTimeStamps(id: string): Promise<SelectUserTimestamps> {
		return await this.userRepository.findOneTimestamps(id);
	}

	async createNewUser(body: CreateUserDTO): Promise<SelectUser> {
		return await this.userRepository.insertOne(body);
	}

	async insertNewUnlockedQuiz(id: string, quizId: string): Promise<string> {
		return await this.userRepository.insertNewUnlockedQuiz(id, quizId);
	}

	async insertNewUnlockedAchievement(id: string, achievementId: string): Promise<string> {
		return await this.userRepository.insertNewUnlockedAchievement(id, achievementId);
	}

	async insertNewCompletedQuiz(id: string, quizId: string): Promise<string> {
		return await this.userRepository.insertNewCompletedQuiz(id, quizId);
	}

	async insertNewHighscore(id: string, highscore_id: string): Promise<string> {
		return await this.userRepository.insertNewHighscore(id, highscore_id);
	}

	async updateUserCredentials(id: string, body: UpdateUserCredentialsDTO): Promise<string> {
		if (body.email) {
			const user = await this.userRepository.checkIfUserExists(body.email);
			if (user) {
				throw new NotFoundException('Email already exists');
			}

			await this.updateSettings(id, { is_verified: false });
			const token = await this.encryptionService.generateToken(id);

			this.eventEmitter.emit('mail.verify-email', new SendVerifyMailEvent(id, body.email, body.first_name, token));
		}
		return await this.userRepository.updateOneCredentials(id, body);
	}

	async updateUserEnergy(id: string, energy: number): Promise<string> {
		return await this.userRepository.updateOneEnergy(id, energy);
	}

	async updateBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string> {
		return await this.userRepository.updateOneBillingInfo(id, body);
	}

	async updateSettings(id: string, body: UpdateUserSettingsDTO): Promise<string> {
		return await this.userRepository.updateOneSettings(id, body);
	}

	async setVerificationStatus(id: string, status: boolean): Promise<string> {
		return await this.userRepository.setVerificationStatus(id, status);
	}

	async updateStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string> {
		return await this.userRepository.updateOneStats(id, body);
	}

	async deleteUser(id: string): Promise<string> {
		return await this.userRepository.deleteOneByID(id);
	}

	async deleteHighscore(id: string, highscore_id: string): Promise<string> {
		return await this.userRepository.deleteHighscore(id, highscore_id);
	}
}
