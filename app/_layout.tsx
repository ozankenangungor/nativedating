import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedInVar } from '@/constants/authenticated';
import { ApolloProvider } from '@apollo/client';
import client from '@/constants/apollo-client';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // Yükleme durumu ekledik
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error){
      console.log(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await AsyncStorage.getItem('userSession'); // AsyncStorage'dan oturum kontrolü yapıyoruz
      if (userSession) {
        isLoggedInVar(true); // Eğer oturum varsa reactive variable'ı güncelliyoruz
      } else {
        isLoggedInVar(false); // Oturum yoksa false olarak ayarlıyoruz
      }
      setIsReady(true); // Kontrol tamamlandığında isReady durumunu güncelliyoruz
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isReady && loaded) {
      // Eğer bileşen tam olarak hazırsa yönlendirme yapıyoruz
      if (isLoggedInVar()) {
        router.replace('/(tabs)'); // Oturum varsa ana sayfaya yönlendir
      } else {
        router.replace('/(modals)/home'); // Oturum yoksa login sayfasına yönlendir
      }
    }
  }, [isReady, loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <RootLayoutNav />
    </ApolloProvider>
  );
}

function RootLayoutNav() {

  return (
    <Stack>
    <Stack.Screen name="(modals)/login" options={{ presentation: 'modal', headerShown: false }} />
    <Stack.Screen name="(modals)/home" options={{ presentation: 'modal', headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    {/* <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
    <Stack.Screen
      name="(modals)/booking"
      options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerTransparent: true,
      }}
    /> */}
  </Stack>
  );
}
