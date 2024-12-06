import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import client from '@/constants/apollo-client';
import '../global.css';
import 'react-native-reanimated';
import { useAuthCheck } from '@/hooks/useAuthCheck';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  const isReady = useAuthCheck();

  if (!isReady || !fontsLoaded) {
    return null; // Henüz hazır değilse hiçbir şey render etme
  }

  return (
    <ApolloProvider client={client}>
      <RootLayoutNav />
    </ApolloProvider>
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="(modals)/dogrulama" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="(modals)/epostaonay" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
