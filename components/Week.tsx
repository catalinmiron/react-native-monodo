import { weekDays } from "@/utils/constants";
import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Day } from "./Day";

export function Week() {
  // To handle gestures, check https://github.com/kirillzyusko/react-native-keyboard-controller/blob/main/example/src/screens/Examples/InteractiveKeyboard/index.tsx#L90
  const { bottom } = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      keyboardShouldPersistTaps='handled'
      disableScrollOnKeyboardHide>
      <View style={{ marginBottom: bottom }}>
        {weekDays.map((day) => (
          <Day day={day} key={`day-${day}`} />
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}
