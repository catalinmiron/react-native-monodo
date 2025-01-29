import { queryClient } from "@/constants/queryClient";
import { globalFormatter } from "@/utils/constants";
import { syncedQuery } from "@legendapp/state/sync-plugins/tanstack-query";
import dayjs from "dayjs";

export const weatherQuery = syncedQuery({
  queryClient: queryClient,
  query: {
    queryKey: ["weather", dayjs().format(globalFormatter)],
    queryFn: async () => {
      // fetch weather data from openweather API
    },
  },
});
