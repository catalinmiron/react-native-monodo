import { weekDays } from "@/utils/constants";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Day } from "./Day";

export function Week() {
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'>
      <View>
        {weekDays.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
