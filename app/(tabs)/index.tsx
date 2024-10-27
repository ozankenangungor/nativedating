import WelcomeHeader from '@/components/WelcomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Button, StyleSheet } from 'react-native';


export default function TabOneScreen() {
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession'); // Oturum bilgisini kaldır
      router.replace('/(modals)/home'); // Giriş sayfasına yönlendir
    } catch (error) {
      console.error('Cikis yapılırken bir hata oluştu:', error);
    }
  };
  return (
   <>
   <Button title="Logout" onPress={handleLogout}/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
