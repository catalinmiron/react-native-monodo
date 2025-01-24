import { NoiseBackground } from "@/components/NoiseBackground";
import { Week } from "@/components/Week";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className='flex-1' edges={["top"]}>
      <NoiseBackground />
      <Week />
    </SafeAreaView>
  );
}
