ALTER TABLE "notes" ADD COLUMN "title" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "content" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "note";