import { persistOptions } from "@/constants/persistance";
import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { PermissionStatus } from "expo-location";

export const location$ = observable({
  latitude: null as number | null,
  longitude: null as number | null,
  status: null as PermissionStatus | null,
});

syncObservable(
  location$,
  persistOptions({
    persist: {
      name: "location",
    },
  })
);
