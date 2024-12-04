import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCreateUser } from '@/hooks/useCreateUser';
import { useRouter } from 'expo-router';

const CreateUserScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const createUser = useCreateUser();
  const router = useRouter();

  const handleCreateUser = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      await createUser(email);
    } catch (e) {
      setError('Kullanıcı oluşturma başarısız. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="mb-10 items-center">
        <View className="w-20 h-20 rounded-full bg-indigo-50 items-center justify-center">
          <Ionicons name="person-add-outline" size={40} color="#6366F1" />
        </View>
      </View>
      <Text className="text-3xl font-bold text-gray-900 mb-6">Create an Account</Text>
      <Text className="text-gray-500 text-lg mb-10">
        Please enter your email to create a new account.
      </Text>
      <View className="mb-4">
        <TextInput
          className="flex-1 text-xl h-12 border-b border-gray-400 pb-3 text-gray-900"
          placeholder="Email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {error ? <Text className="text-red-500 mt-4 text-lg">{error}</Text> : null}
      <TouchableOpacity
        className={`mt-4 w-full h-16 ${loading ? 'bg-gray-500' : 'bg-indigo-600'} rounded-full items-center justify-center`}
        onPress={handleCreateUser}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className="text-white text-xl">Create Account</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateUserScreen;
