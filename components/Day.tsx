import { localFormatter, weekDayFormatter, weekDays } from "@/utils/constants";
import dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";
import { Todos } from "./Todos";

// day will be formatted as YYYY-MM-DD / check @/utils/constants
export function Day({ day }: { day: string }) {
  return (
    <View
      className='gap-2 p-4 pl-12 border-t-2 border-black/10'
      style={{
        minHeight: `${100 / weekDays.length}%`,
      }}>
      <View>
        <Text className='text-4xl uppercase font-barlow-900'>
          {dayjs(day).format(weekDayFormatter)}
        </Text>
        <Text className='font-barlow-400 text-gray-600'>
          {dayjs(day).format(localFormatter)} - 24°C
        </Text>
      </View>

      <Todos day={day} />
    </View>
  );
}
