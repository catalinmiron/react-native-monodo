import { API_URL, ForecastPayload } from "@/constants/openweather";
import { queryClient } from "@/constants/queryClient";
import { observable, observe } from "@legendapp/state";
import { currentDay } from "@legendapp/state/helpers/time";
import { syncedQuery } from "@legendapp/state/sync-plugins/tanstack-query";
import { location$ } from "./location";

export const weatherQuery$ = observable(
  syncedQuery({
    queryClient: queryClient,
    query: {
      queryKey: [
        "weather",
        currentDay.get().toDateString(),
        `latitude-${location$.latitude.get()}`,
        `longitude-${location$.longitude.get()}`,
      ],
      queryFn: async () => {
        const data = (await fetch(
          `${API_URL}?units=metric&lat=${location$.latitude.get()}&lon=${location$.longitude.get()}&appid=${
            process.env.EXPO_PUBLIC_OPENWEATHER_API
          }`
        ).then((x) => x.json())) as ForecastPayload;

        return data;
        // fetch weather data from openweather API
      },
    },
  })
);

observe(location$.get(), (e) => {
  // console.log(e.value);

  if (!e.value?.latitude || !e.value?.longitude) {
    return;
  }
  // get() the value to start syncing, and it will be reactive to updates coming in

  weatherQuery$.get();
});
