import { weekDays } from "@/utils/constants";
import React from "react";
import { ScrollView, View } from "react-native";
import { Day } from "./Day";

export function Week() {
  return (
    <ScrollView>
      <View>
        {weekDays.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </ScrollView>
  );
}
