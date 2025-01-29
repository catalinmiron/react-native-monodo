import { useColorScheme } from "@/hooks/useColorScheme.web";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

export function NoiseBackground() {
  const theme = useColorScheme() ?? "light";
  return (
    <LinearGradient
      colors={
        theme === "light" ? ["#D7D7D7", "#ACACAC"] : ["#000000", "#333333"]
      }
      start={[0, 0]}
      end={[0, 1]}
      className='flex-1 absolute left-0 right-0 top-0 bottom-0'>
      <Image
        source={require("@/assets/todo_bg.png")}
        resizeMode='repeat'
        className='absolute left-0 top-0 bottom-0 right-0 w-full h-full'
      />
    </LinearGradient>
  );
}
