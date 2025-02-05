import { drizzle } from "drizzle-orm/expo-sqlite";
import { defaultDatabaseDirectory, openDatabaseSync } from "expo-sqlite";

// https://orm.drizzle.team/docs/connect-expo-sqlite#add-migrations-to-your-app
// Check the documentation when we actually have something to migrate.

import { Paths } from "expo-file-system/next";
import { Platform } from "react-native";
const dbPath =
  Platform.OS === "ios"
    ? Object.values(Paths.appleSharedContainers)?.[0]?.uri
    : defaultDatabaseDirectory;
export const sqliteDb = (shouldCloseConnection?: boolean) => {
  const db = openDatabaseSync(
    "db.db",
    {
      enableChangeListener: true,
    },
    dbPath
  );

  if (shouldCloseConnection) {
    if (db.isInTransactionSync()) {
      db.closeSync();

      return openDatabaseSync(
        "db.db",
        {
          enableChangeListener: true,
        },
        dbPath
      );
    }
  }

  return db;
};

// console.log("sqliteDb.databasePath: ", sqliteDb.databasePath);
// console.log(Object.values(Paths.appleSharedContainers));

export const db = drizzle(sqliteDb(), {
  logger: false,
});
