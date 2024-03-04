ALTER TABLE "achievements" ALTER COLUMN "id" SET DEFAULT 'ljoelbpyi02e6o3oq62xtqgf';--> statement-breakpoint
ALTER TABLE "quiz_highscores" ALTER COLUMN "id" SET DEFAULT 't119uoynjku656g0deqznyoe';--> statement-breakpoint
ALTER TABLE "quiz_questions" ALTER COLUMN "id" SET DEFAULT 'y4cq63xyluaqoe807izgdi3b';--> statement-breakpoint
ALTER TABLE "quizzes" ALTER COLUMN "id" SET DEFAULT 'audd0o8das5hatt1gng4gj96';--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "id" SET DEFAULT 'e6hg4b5cjczy0p3nbp82qltz';--> statement-breakpoint
ALTER TABLE "app_states" ALTER COLUMN "id" SET DEFAULT 'a7noru9phye2x20df0h3r95r';--> statement-breakpoint
ALTER TABLE "billing_informations" ALTER COLUMN "id" SET DEFAULT 'ipmakzlwx01ui9fnj0cgh6qn';--> statement-breakpoint
ALTER TABLE "user_settings" ALTER COLUMN "id" SET DEFAULT 'cnog6t01ornnik7pooaps1qp';--> statement-breakpoint
ALTER TABLE "user_statistics" ALTER COLUMN "id" SET DEFAULT 'crzcod6f9c1kgdm3xv4nf1dq';--> statement-breakpoint
ALTER TABLE "user_timestamps" ALTER COLUMN "id" SET DEFAULT 'ewaejlrea6d13gol7fiucvlo';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'yp6xivtw6gfrfue9fa6usf4v';--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");