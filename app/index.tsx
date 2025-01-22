import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-barlow-700 text-selected'>Home</Text>
    </SafeAreaView>
  );
}
