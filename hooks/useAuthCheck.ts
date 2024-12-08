import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

export const useAuthCheck = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // SplashScreen'i gizlemeyi ertele
        await SplashScreen.preventAutoHideAsync();

        // SecureStore'dan token'i al
        const token = await SecureStore.getItemAsync('accessToken');
        console.log('token', token);
        if (token) {
          // Token varsa ve geçerliyse ana sayfaya yönlendir
          router.replace('/(screens)/Home'); // Ana sayfa yolunuza göre güncelleyin
        } else {
          setIsReady(true); // Token yoksa giriş ekranını göster
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setIsReady(true);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, [router]);

  return isReady;
};
