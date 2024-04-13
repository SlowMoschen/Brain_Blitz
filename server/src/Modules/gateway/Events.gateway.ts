import { Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { corsOptions } from 'src/Configs/cors.confing';
import { NewQuizUnlockedEvent } from 'src/Events/quiz.events';
import { QuizService } from '../quizzes/quizzes.service';

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
        console.log(this.currentConntections);
	}

	/**
	 * @description - Listens to the 'quiz.unlocked' event emitted by the server
	 * - Sends a notification to the user that a new quiz has been unlocked
	 * @param {NewQuizUnlockedEvent} - The event emitted by the server
	 */
	@OnEvent('quiz.unlocked')
	async handleQuizUnlocked({ user_id, quiz_id }: NewQuizUnlockedEvent) {
		const quiz = await this.quizService.getQuiz(quiz_id);
		const { title, category, id } = quiz;

		for (let [key, value] of this.currentConntections) {
			console.log(key, value);
			if (value === user_id) {
				this.server.to(key).emit('quiz.unlocked', { title, category, quiz_id: id });
			}
		}
	}
}
