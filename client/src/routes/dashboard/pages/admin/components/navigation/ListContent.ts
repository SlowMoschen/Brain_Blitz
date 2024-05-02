import { URLS } from "../../../../../../configs/Links";

interface IListItem {
    name: string;
    path?: string;
    children?: IListItem[];
}

export const listItems: IListItem[] = [
    {
        name: "Dashboard",
        path: URLS.ADMIN_ROUTES.DASHBOARD,
    },
    {
        name: "Users",
        children: [
            {
                name: "Alle Benutzer",
                path: URLS.ADMIN_ROUTES.ALL_USERS,
            },
            {
                name: "Letzten 14 Tage",
                path: URLS.ADMIN_ROUTES.RECENT_USERS,
            }
        ],
    },
    {
        name: "Quiz",
        children: [
            {
                name: "Create Quiz",
                path: URLS.ADMIN_ROUTES.CREATE_QUIZ,
            },
            {
                name: "Alle Quiz",
                path: URLS.ADMIN_ROUTES.ALL_QUIZZES,
            },
            {
                name: "Katagorien",
                path: URLS.ADMIN_ROUTES.QUIZ_CATEGORIES,
            }
        ],
    }
  ];