CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
