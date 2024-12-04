import { useFonts } from 'expo-font';
import { Href, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloProvider } from '@apollo/client';
import client from '@/constants/apollo-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

async function verifyToken(token: string) {
  try {
    const response = await axios.get('http://localhost:3001/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Token verification failed', error);
    return null;
  }
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token && await verifyToken(token)) {
        router.replace('/(tabs)');
      } else {
        router.replace('/');
      }
      setIsReady(true);
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

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