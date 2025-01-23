PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`date` integer NOT NULL,
	`description` text DEFAULT '',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`done` integer DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_todos`("id", "content", "date", "description", "created_at", "done") SELECT "id", "content", "date", "description", "created_at", "done" FROM `todos`;--> statement-breakpoint
DROP TABLE `todos`;--> statement-breakpoint
ALTER TABLE `__new_todos` RENAME TO `todos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;