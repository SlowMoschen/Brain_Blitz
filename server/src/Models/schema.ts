// Purpose: Export all the schemas for the models to be used in the db connection and ORM

import {
    users,
    user_settings,
    user_statistics,
    user_timestamps,
    app_states,
    billing_informations,
    userRelations,
    appStatesRelations
} from "./users.schemas";

import {
    quizzes,
    quiz_highscores,
    quiz_questions,
    quizRelations
} from "./quizzes.schemas";

import {
    achievements,
} from "./achievements.schemas";

import {
    tokens,
    tokenRelations
} from "./tokens.schemas";

export {
    users,
    user_settings,
    user_statistics,
    user_timestamps,
    app_states,
    billing_informations,
    userRelations,
    appStatesRelations,
    quizzes,
    quiz_highscores,
    quiz_questions,
    quizRelations,
    achievements,
    tokens,
    tokenRelations
}
