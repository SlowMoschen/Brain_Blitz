import { useEffect, useRef } from "react";
import { User } from "../types/User";

export function useCompareUserQuizzes(newUser: User) {
    const user = useRef<User | null>(null);

  const compareQuizzes = (newUser: User) => {
    if (user.current) {
      const newUnlockedQuizzes = newUser.unlocked_quizzes.map((table) => table.quiz);
      const oldUnlockedQuizzes = user.current.unlocked_quizzes.map((table) => table.quiz);

      const unlockedQuizzes = newUnlockedQuizzes.filter(
        (quiz) => !oldUnlockedQuizzes.includes(quiz)
      );

      if (unlockedQuizzes.length > 0) {
        return unlockedQuizzes;
      }

      return null;
    }
  };

  useEffect(() => {
    user.current = newUser;
  }, [newUser]);

  const changedQuizzes = compareQuizzes(newUser);

    return { changedQuizzes };
}
