ALTER TABLE "integration" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "status" ALTER COLUMN "updated_at" SET DEFAULT now();