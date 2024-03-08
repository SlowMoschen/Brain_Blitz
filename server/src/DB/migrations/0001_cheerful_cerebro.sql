ALTER TABLE "users_timestamps" ADD COLUMN "billing_information_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_timestamps" ADD COLUMN "statistics_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_timestamps" ADD COLUMN "settings_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users_timestamps" ADD COLUMN "last_password_reset" timestamp DEFAULT now() NOT NULL;