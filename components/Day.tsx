import { DayWeather, getIcon } from "@/constants/openweather";
import {
  localFormatter,
  weekDayColors,
  weekDayFormatter,
  weekDays,
} from "@/utils/constants";
import { Accordion } from "@animatereactnative/accordion";
import { currentDay } from "@legendapp/state/helpers/time";
import { observer } from "@legendapp/state/react";
import dayjs from "dayjs";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./Icon";
import { Todos } from "./Todos";

// day will be formatted as YYYY-MM-DD / check @/utils/constants
export const Day = observer(
  ({ day, weather }: { day: string; weather?: DayWeather }) => {
    const { height } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();
    const isCurrentDay = dayjs(day).isSame(dayjs(currentDay.get()), "day");
    return (
      <Accordion.Accordion
        isOpen={isCurrentDay}
        className='gap-2 pt-4 pr-4 pl-12 border-t-2 border-black/5'
        style={{
          minHeight: (height - top - bottom) / weekDays.length,
          backgroundColor: weekDayColors[dayjs(day).weekday()],
          // experimental_backgroundImage: `linear-gradient(to bottom, ${
          //   weekDayColors[dayjs(day).weekday()]
          // }, rgba(0,0,0,0.1))`,
        }}>
        <Accordion.Header>
          <Text className='text-4xl uppercase font-barlow-900'>
            {dayjs(day).format(weekDayFormatter)}
          </Text>
          <Accordion.Expanded className='flex-row gap-2'>
            <Text className='font-barlow-400 text-gray-600'>
              {dayjs(day).format(localFormatter)}
            </Text>
            {weather && (
              <View className='flex-row gap-1 items-center'>
                <Text className='font-barlow-400 text-gray-600'>
                  - {weather?.temp.day.toFixed(1)}°C
                </Text>
                <Icon
                  name={getIcon(weather.weather[0].id)}
                  size={14}
                  className='stroke-gray-600'
                />
              </View>
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
