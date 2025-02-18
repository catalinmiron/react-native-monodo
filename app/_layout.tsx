import "@/utils/cssInterop";
import {
  Barlow_300Light,
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_700Bold,
  Barlow_900Black,
  useFonts,
} from "@expo-google-fonts/barlow";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalMigrations } from "@/hooks/useLocalMigrations";
import { vexo } from "vexo-analytics";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
  duration: 500,
});

import { queryClient } from "@/constants/queryClient";
import { useExpoUpdates } from "@/hooks/useExpoUpdates";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY as string);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Barlow_300Light: Barlow_300Light,
    Barlow_400Regular: Barlow_400Regular,
    Barlow_500Medium: Barlow_500Medium,
    Barlow_700Bold: Barlow_700Bold,
    Barlow_900Black: Barlow_900Black,
  });

  useLocalMigrations();
  if (!__DEV__) {
    useExpoUpdates();
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView className='flex-1'>
          <KeyboardProvider>
            <Stack>
              <Stack.Screen name='index' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
            <StatusBar style='auto' />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
