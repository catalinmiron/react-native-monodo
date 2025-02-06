import { DayWeather } from "@/constants/openweather";
import { useStoreLocation } from "@/hooks/useStoreLocation";
import { location$ } from "@/state/location";
import { weatherQuery$ } from "@/state/weather";
import { getWeekDays } from "@/utils/constants";
import { currentDay } from "@legendapp/state/helpers/time";
import { observer } from "@legendapp/state/react";
import MaskedView from "@react-native-masked-view/masked-view";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useAnimatedRef } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
  const { bottom, top } = useSafeAreaInsets();
  const ref = useAnimatedRef<ScrollView>();
  const _currentDay = currentDay.get();
  const weekDays = useMemo(() => getWeekDays(), [_currentDay]);

  // Compensate for Android
  const topSpacing = 32 + top;

  return (
    <>
      <KeyboardAwareScrollView
        ref={ref}
        bottomOffset={62}
        keyboardShouldPersistTaps='handled'
        disableScrollOnKeyboardHide
        contentContainerStyle={{
          paddingTop: Platform.OS === "android" ? topSpacing : 0,
        }}>
        <SafeAreaView>
          {weekDays.map((day, index) => (
            <Day
              scrollRef={ref}
              day={day}
              key={`day-${day}`}
              weather={data?.[day]}
            />
          ))}
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <View
        className='absolute left-0 right-0 top-0 z-10'
        pointerEvents='none'
        style={{ height: Platform.OS === "android" ? topSpacing * 1.5 : top }}>
        <MaskedView
          androidRenderingMode='software'
          maskElement={
            <LinearGradient
              colors={["black", "#333", "#00000000"]}
              start={[0, 0]}
              end={[0, 1]}
              style={StyleSheet.absoluteFillObject}
            />
          }
          style={[StyleSheet.absoluteFill]}>
          <BlurView
            intensity={Platform.OS === "android" ? 10 : 20}
            tint='dark'
            style={[StyleSheet.absoluteFill]}
            experimentalBlurMethod={"dimezisBlurView"}
          />
        </MaskedView>
      </View>
    </>
  );
});
