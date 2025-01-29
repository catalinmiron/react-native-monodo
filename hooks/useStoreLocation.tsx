import { queryClient } from "@/constants/queryClient";
import { location$ } from "@/state/location";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import { AppState, NativeEventSubscription } from "react-native";

async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  location$.status.set(status);
  if (status !== "granted") {
    // setErrorMsg("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  console.log({ location });
  location$.set({
    latitude,
    longitude,
    status: Location.PermissionStatus.GRANTED,
  });
  await queryClient.invalidateQueries({
    queryKey: ["weather"],
  });

  // weatherQuery$.delete();
  // weatherQuery$.get();
}
export function useStoreLocation() {
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const appStateListener = useRef<NativeEventSubscription>();

  useEffect(() => {
    appStateListener.current = AppState.addEventListener(
      "change",
      (appState) => {
        if (appState === "active") {
          getCurrentLocation();
        }
      }
    );

    return () => {
      appStateListener.current!.remove();
    };
  }, []);
}
