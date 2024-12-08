import { View, Text, Image, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";
import { Href, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import beachImage from "@/assets/deneme/deneme3.png";
import AppleSignInButton from "@/components/AppleButton";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
      } else {
        router.replace('/(modals)/epostaonay');
      }
    };
    checkAuthToken();
  }, []);

  return (
    
    <View className="flex-1 ">
      
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.8)"]}
        >
          <SafeAreaView className="flex flex-1 px-1 justify-between">
            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(90)
                .springify(20)}
            >
              <Text className="text-center text-white font-bold text-4xl">
              </Text>
              <Text className="text-center text-white font-regular text-2xl mt-3">
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(80)
                .springify(20)}
            >
              <CustomButton
                onPress={() => router.push("/(modals)/epostaonay" as Href)}
                title="Get Started"
              />
            </Animated.View>

            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
