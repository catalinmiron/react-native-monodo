import { observable } from "@legendapp/state";
import { PermissionStatus } from "expo-location";

export const location$ = observable({
  latitude: null,
  longitude: null,
  status: null as PermissionStatus | null,
});
