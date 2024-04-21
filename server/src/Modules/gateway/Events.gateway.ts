import { Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { corsOptions } from 'src/Configs/cors.confing';
import { UpdateNotificationEvent } from 'src/Events/notification.events';
import { NewQuizUnlockedEvent } from 'src/Events/quiz.events';
import { UserLogEvent } from 'src/Events/user.events';
import { QuizService } from '../quizzes/quizzes.service';
import { newQuizUnlockedNotification, updateNotification, welcomeNotification } from './notifications';

/**
 * @description - The EventsGateway class is a WebSocketGateway that handles all the events that are emitted from the server
 * - mainly used for real-time notifications
 */

@WebSocketGateway({
	cors: corsOptions,
})
export class EventsGateway implements OnModuleInit {
	private logger = new Logger(EventsGateway.name);
	private currentConntections: Map<string, string> = new Map();

	constructor(private readonly quizService: QuizService) {}

	@WebSocketServer()
	server: Server;

	/**
	 * @description - Initializes the WebSocket server
	 * - Logs a message when a client connects
	 * - Logs a message when a client initializes with sending the user_id
	 * - Adds the user_id and socket.id to the currentConnections map
	 */
	onModuleInit() {
		this.server.on('connection', (socket) => {
			this.logger.log(`WebSocket client connected: ${socket.id}`);
		});
	}

	@SubscribeMessage('disconnect')
	handleDisconnect(@ConnectedSocket() socket: Socket) {
		this.logger.log(`WebSocket client disconnected: ${socket.id}`);
		this.currentConntections.delete(socket.id);
	}

	@SubscribeMessage('init')
	handleInit(@MessageBody() { user_id }: { user_id: string }, @ConnectedSocket() socket: Socket) {
		this.logger.log(`WebSocket client initialized for user ${user_id}`);
		this.currentConntections.set(socket.id, user_id);
	}

	/**
	 * @description - Listens to the 'quiz.unlocked' event emitted by the server
	 * - Sends a notification to the user that a new quiz has been unlocked
	 * @param {NewQuizUnlockedEvent} - The event emitted by the server
	 */
	@OnEvent('quiz.unlocked')
	async handleQuizUnlocked({ user_id, quiz_id }: NewQuizUnlockedEvent) {
		const quiz = await this.quizService.getQuiz(quiz_id);

		const socketId = this.getSocketByUserId(user_id);
		if (socketId) {
			this.server.to(socketId).emit('quiz.unlocked', newQuizUnlockedNotification(quiz));
		}
	}

	@OnEvent('notification.firstLogin')
	handleUserLoginEvent({ user_id }: UserLogEvent) {
		const socketId = this.getSocketByUserId(user_id);
		if (socketId) {
			this.server.to(socketId).emit('notifi.firstLogin', welcomeNotification());
		}
	}

	@OnEvent('notification.update')
	handleUpdateNotificationEvent({ user_id, update }: UpdateNotificationEvent) {
		const socketId = this.getSocketByUserId(user_id);
		if (socketId) {
			this.server.to(socketId).emit('notifi.update', updateNotification(update));
		}
	}

	private getSocketByUserId(user_id: string): string {
		for (let [key, value] of this.currentConntections) {
			if (value === user_id) {
				return key;
			}
		}
		return null;
	}
}
