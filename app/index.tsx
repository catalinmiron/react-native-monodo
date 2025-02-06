import { NoiseBackground } from "@/components/NoiseBackground";
import { Week } from "@/components/Week";
import { View } from "react-native";

export default function Home() {
  return (
    <View className='flex-1' edges={["top"]}>
      <NoiseBackground />
      <Week />
    </View>
  );
}
