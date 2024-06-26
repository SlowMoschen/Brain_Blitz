import { IQuiz } from "./Quiz";

export interface NewQuizUnlockedEvent {
  title: string;
  category: string;
  quiz_id: string;
}

interface INotificationData{
  messageBlocks: { header: string, body: string }[];
  quiz?: IQuiz;
}

export interface INotification{
  type: 'unlock' | 'generic' | 'update';
  topic: string;
  notificationData: INotificationData;
}
