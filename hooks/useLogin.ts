import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/urls';
import client from '../constants/apollo-client';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest) => {
    try {
      const res = await fetch(`http://192.168.2.188:3001/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Invalid email or password");
        } else {
          setError("Unknown error occured.");
        }
        return;
      }

      const data = await res.json();
      await AsyncStorage.setItem('authToken', data.token); // token'ı AsyncStorage'a kaydediyoruz.
      setError("");

      // Apollo Client ile aktif sorguları yeniden yükleme
      await client.refetchQueries({ include: 'active' });
    } catch (error) {
      console.error('Login error:', error);
      setError("Unknown error occured.");
    }
  };

  return { login, error };
};

export { useLogin };
