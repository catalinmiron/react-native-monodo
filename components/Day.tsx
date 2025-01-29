import { DayWeather, getIcon } from "@/constants/openweather";
import { localFormatter, weekDayFormatter, weekDays } from "@/utils/constants";
import { Accordion } from "@animatereactnative/accordion";
import { currentDay } from "@legendapp/state/helpers/time";
import { observer } from "@legendapp/state/react";
import dayjs from "dayjs";
import React from "react";
import { Text, useWindowDimensions } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./Icon";
import { Todos } from "./Todos";

// day will be formatted as YYYY-MM-DD / check @/utils/constants
export const Day = observer(
  ({ day, weather }: { day: string; weather?: DayWeather }) => {
    const { height } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();
    const isCurrentDay = dayjs(day).isSame(dayjs(currentDay.get()), "day");
    const dayBg = {
      1: `bg-gray-400/5 dark:bg-black/5`,
      2: `bg-gray-400/10 dark:bg-black/10`,
      3: `bg-gray-400/20 dark:bg-black/20`,
      4: `bg-gray-400/30 dark:bg-black/30`,
      5: `bg-gray-400/40 dark:bg-black/40`,
      6: `bg-gray-400/50 dark:bg-black/50`,
      0: `bg-gray-400/60 dark:bg-black/60`, // Sunday
    };
    return (
      <Accordion.Accordion
        isOpen={isCurrentDay}
        className={`gap-2 pt-4 pr-4 pl-12 border-t-2 border-black/5 ${
          dayBg[dayjs(day).weekday()]
        }`}
        style={{
          minHeight: (height - top - bottom) / weekDays.length,
          // backgroundColor: weekDayColors[dayjs(day).weekday()],
          // experimental_backgroundImage: `linear-gradient(to bottom, ${
          //   weekDayColors[dayjs(day).weekday()]
          // }, rgba(0,0,0,0.1))`,
        }}>
        <Accordion.Header>
          <Text className='text-4xl uppercase font-barlow-900 dark:text-white'>
            {dayjs(day).format(weekDayFormatter)}
          </Text>
          <Accordion.Expanded className='flex-row gap-4'>
            <Text className='font-barlow-400 text-gray-600 dark:text-stone-300'>
              {dayjs(day).format(localFormatter)}
            </Text>
            {weather && (
              <Animated.View
                className='flex-row gap-1 items-center'
                entering={FadeInRight.springify().damping(14)}>
                <Icon
                  name={getIcon(weather.weather[0].id)}
                  size={14}
                  className='stroke-gray-600 dark:stroke-stone-300'
                />
                <Text className='font-barlow-400 text-gray-600 dark:text-stone-300'>
                  {weather?.temp.day.toFixed(1)}°C
                </Text>
              </Animated.View>
            )}
          </Accordion.Expanded>
        </Accordion.Header>

        <Accordion.Expanded>
          <Todos day={day} />
        </Accordion.Expanded>
      </Accordion.Accordion>
    );
  }
);
