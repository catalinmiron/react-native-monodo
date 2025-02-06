import * as Updates from "expo-updates";
import { useEffect } from "react";
import { AppState } from "react-native";
export function useExpoUpdates() {
  useEffect(() => {
    AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        console.log("Checking for updates...");
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            console.log("Update is available, reloading...");
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch (error) {
          // You can also add an alert() to see the error message in case of an error when fetching updates.
          console.error(`Error fetching latest Expo update: ${error}`);
        }
      }
    });
  }, []);
}
