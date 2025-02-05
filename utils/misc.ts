import { Insets } from "react-native";

export const hitSlop: Insets = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
