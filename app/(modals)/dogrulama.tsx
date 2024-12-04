import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';
import { router } from 'expo-router';

// GraphQL Mutasyonu
const VERIFY_CODE_MUTATION = gql`
  mutation VerifyCode($code: String!) {
    verifyCode(code: $code)
  }
`;

const VerificationCodeScreen = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [verifyCode] = useMutation(VERIFY_CODE_MUTATION);

  const handleCodeInput = (text: string, index: number) => {
    const updatedCode = [...code];
    updatedCode[index] = text;
    setCode(updatedCode);
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    router.push('/(screens)/Home')
    if (!fullCode) {
      setError('Doğrulama kodu eksik.');
      return;
    }

    try {
      await verifyCode({ variables: { code: fullCode } });
      setError('');
      console.log('Doğrulama başarılı.');
    } catch (e) {
      setError('Kod doğrulama başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="mb-10 items-center">
        <View className="w-20 h-20 rounded-full bg-indigo-50 items-center justify-center">
          <Ionicons name="shield-outline" size={40} color="#6366F1" />
        </View>
      </View>
      <Text className="text-3xl font-bold text-gray-900 mb-4">Enter your verification code</Text>
      <Text className="text-gray-500 text-lg mb-10">Sent to your phone.</Text>
      <View className="flex-row justify-between mb-10">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            className="w-14 h-14 border-b border-gray-400 text-center text-2xl font-bold"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleCodeInput(text, index)}
          />
        ))}
      </View>
      {error ? <Text className="text-red-500 text-lg text-center mb-4">{error}</Text> : null}
      <TouchableOpacity
        className="absolute right-6 bottom-10 w-16 h-16 bg-indigo-600 rounded-full items-center justify-center"
        onPress={handleVerify}
      >
        <Ionicons name="arrow-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default VerificationCodeScreen;
