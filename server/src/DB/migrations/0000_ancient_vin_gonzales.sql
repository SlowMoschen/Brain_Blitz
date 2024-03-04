CREATE TABLE IF NOT EXISTS "achievements" (
	"id" text PRIMARY KEY DEFAULT 'agmoj9db5qjo58epp0kuieiv' NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"category" varchar NOT NULL,
	"requirements" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_highscores" (
	"id" text PRIMARY KEY DEFAULT 'e26eow5klr5lsds4nvnnzeuf' NOT NULL,
	"quiz_id" text NOT NULL,
	"user_id" text NOT NULL,
	"score" integer NOT NULL,
	"time" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_questions" (
	"id" text PRIMARY KEY DEFAULT 'grvhd2jnmoyh3slqxiu7t854' NOT NULL,
	"quiz_id" text NOT NULL,
	"questions" text[] NOT NULL,
	"correct_answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" text PRIMARY KEY DEFAULT 'qmt9eia9mmh94x3tkhlorxba' NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"category" varchar NOT NULL,
	"highscores" integer,
	"questions" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" text PRIMARY KEY DEFAULT 'yxmz720ghy9eicobtsu7byb0' NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_states" (
	"id" text PRIMARY KEY DEFAULT 'pjvsit5kx2ds3b2mbabwmz52' NOT NULL,
	"user_id" text NOT NULL,
	"energy" integer DEFAULT 100 NOT NULL,
	"unlocked_quizzes" text,
	"completed_quizzes" text,
	"unlocked_achievements" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billing_informations" (
	"id" text PRIMARY KEY DEFAULT 'ogionu2ju9vku0yy0k13natj' NOT NULL,
	"user_id" text NOT NULL,
	"payment_method" "payment_methods" NOT NULL,
	"billing_address" text NOT NULL,
	"billing_city" varchar NOT NULL,
	"billing_zip" varchar NOT NULL,
	"billing_country" varchar NOT NULL,
	"billing_state" varchar NOT NULL,
	"billing_phone" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_settings" (
	"id" text PRIMARY KEY DEFAULT 'huopupihofwyk47ko8gj6hes' NOT NULL,
	"user_id" text NOT NULL,
	"theme" varchar DEFAULT 'default' NOT NULL,
	"language" varchar DEFAULT 'de-DE' NOT NULL,
	"role" "roles" DEFAULT 'user',
	"is_verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_statistics" (
	"id" text PRIMARY KEY DEFAULT 'ie48zx66te975vbn837hyuc2' NOT NULL,
	"user_id" text NOT NULL,
	"max_login_streak" integer DEFAULT 0 NOT NULL,
	"current_login_streak" integer DEFAULT 0 NOT NULL,
	"total_logins" integer DEFAULT 0 NOT NULL,
	"completed_quizzes" integer DEFAULT 0 NOT NULL,
	"completed_questions" integer DEFAULT 0 NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"wrong_answers" integer DEFAULT 0 NOT NULL,
	"total_time" integer DEFAULT 0 NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_timestamps" (
	"id" text PRIMARY KEY DEFAULT 'y9371pki50ibisv1ib1bunkq' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_login" timestamp DEFAULT now(),
	"last_logout" timestamp DEFAULT now(),
	"last_quiz" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY DEFAULT 'ybcglc16k17a6mdejkylovcc' NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_highscores" ADD CONSTRAINT "quiz_highscores_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_highscores" ADD CONSTRAINT "quiz_highscores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_highscores_quiz_highscores_id_fk" FOREIGN KEY ("highscores") REFERENCES "quiz_highscores"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_questions_quiz_questions_id_fk" FOREIGN KEY ("questions") REFERENCES "quiz_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_states" ADD CONSTRAINT "app_states_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_states" ADD CONSTRAINT "app_states_unlocked_quizzes_quizzes_id_fk" FOREIGN KEY ("unlocked_quizzes") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_states" ADD CONSTRAINT "app_states_completed_quizzes_quizzes_id_fk" FOREIGN KEY ("completed_quizzes") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_states" ADD CONSTRAINT "app_states_unlocked_achievements_achievements_id_fk" FOREIGN KEY ("unlocked_achievements") REFERENCES "achievements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "billing_informations" ADD CONSTRAINT "billing_informations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_statistics" ADD CONSTRAINT "user_statistics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_timestamps" ADD CONSTRAINT "user_timestamps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
