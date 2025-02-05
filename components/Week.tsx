import { DayWeather } from "@/constants/openweather";
import { useStoreLocation } from "@/hooks/useStoreLocation";
import { location$ } from "@/state/location";
import { weatherQuery$ } from "@/state/weather";
import { weekDays } from "@/utils/constants";
import { observer } from "@legendapp/state/react";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useAnimatedRef } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Day } from "./Day";

export const Week = observer(() => {
  const list = weatherQuery$.list.get();
  const { latitude, longitude } = location$.get();

  const data = useMemo(() => {
    return list?.reduce(
      (acc, item) => ({
        ...acc,
        [dayjs(item.dt * 1000).format("YYYY-MM-DD")]: item,
      }),
      {} as Record<string, DayWeather>
    );
  }, [list, latitude, longitude]);

  useStoreLocation();

  // To handle gestures, check https://github.com/kirillzyusko/react-native-keyboard-controller/blob/main/example/src/screens/Examples/InteractiveKeyboard/index.tsx#L90
  const { bottom } = useSafeAreaInsets();
  const ref = useAnimatedRef<ScrollView>();

  return (
    <KeyboardAwareScrollView
      ref={ref}
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'
      disableScrollOnKeyboardHide>
      <View style={{ marginBottom: bottom }}>
        {weekDays.map((day, index) => (
          <Day
            scrollRef={ref}
            day={day}
            key={`day-${day}`}
            weather={data?.[day]}
          />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
});
