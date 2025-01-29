import { observable } from "@legendapp/state";
import { PermissionStatus } from "expo-location";

export const location$ = observable({
  latitude: null as number | null,
  longitude: null as number | null,
  status: null as PermissionStatus | null,
});
