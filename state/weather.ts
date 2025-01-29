import { API_URL, ForecastPayload } from "@/constants/openweather";
import { queryClient } from "@/constants/queryClient";
import { observable, observe } from "@legendapp/state";
import { currentTime } from "@legendapp/state/helpers/time";
import { syncedQuery } from "@legendapp/state/sync-plugins/tanstack-query";
import dayjs from "dayjs";

export const weatherQuery$ = observable(
  syncedQuery({
    queryClient: queryClient,
    query: {
      queryKey: ["weather", dayjs(currentTime.get()).format("YYYY-MM-DD")],
      queryFn: async () => {
        const data = (await fetch(
          `${API_URL}?units=metric&lat=44.34&lon=10.99&appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API}`
        ).then((x) => x.json())) as ForecastPayload;

        return data;
        // fetch weather data from openweather API
      },
    },
  })
);

observe(() => {
  // get() the value to start syncing, and it will be reactive to updates coming in
  weatherQuery$.get();
});
