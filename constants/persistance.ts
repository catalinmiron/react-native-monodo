import { observablePersistSqlite } from "@legendapp/state/persist-plugins/expo-sqlite";
import { configureSynced } from "@legendapp/state/sync";
import { Storage } from "expo-sqlite/kv-store";

export const persistOptions = configureSynced({
  persist: {
    plugin: observablePersistSqlite(Storage),
  },
});
