// Purpose: Export all the tables from the database to be used in the seed and clear scripts

import {
    users,
    user_settings,
    user_statistics,
    user_timestamps,
    app_states,
    billing_informations,
} from "./users.schemas";

import {
    quizzes,
    quiz_highscores,
    quiz_questions,
} from "./quizzes.schemas";

import {
    achievements,
} from "./achievements.schemas";

import {
    tokens,
} from "./tokens.schemas";

export {
    users,
    user_settings,
    user_statistics,
    user_timestamps,
    app_states,
    billing_informations,
    quizzes,
    quiz_highscores,
    quiz_questions,
    achievements,
    tokens,
}
