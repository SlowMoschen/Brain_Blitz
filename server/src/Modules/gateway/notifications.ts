import { SelectQuiz } from 'src/Utils/Types/model.types';
import { AppUpdate } from './updates';

type NotificationType = 'unlock' | 'generic' | 'update';

interface NotificationData {
	messageBlocks: { header: string; body: string }[];
	quiz?: SelectQuiz;
}

export class Notification {
	constructor(
		public readonly type: NotificationType,
		public readonly topic: string,
		public readonly notificationData: NotificationData,
	) {}
}

export const welcomeNotification = () => {
	return new Notification('generic', '🎉 Willkommen bei Brain Blitz! 🎉', {
		messageBlocks: [
			{
				header: 'Vielen Dank für deine Anmeldung!',
				body: 'Wir freuen uns, dass du da bist und wünschen dir viel Spaß beim spielen!',
			},
		],
	});
};

export const newQuizUnlockedNotification = (quiz: SelectQuiz) => {
	return new Notification('unlock', '🔒 Neues Quiz 🔒', {
		quiz,
		messageBlocks: [
			{
				header: '',
				body: `Du kannst jetzt das Quiz "${quiz.title}" in der Kategorie "${quiz.category}" spielen!`,
			},
		],
	});
};

export const updateNotification = (update: AppUpdate) => {
	return new Notification('update', `🆕 Neues Update ${update.version} 🆕`, {
		messageBlocks: update.changes,
	});
};
