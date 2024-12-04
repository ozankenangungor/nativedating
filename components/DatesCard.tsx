import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");

interface DatesCardProps {
  item: any; // You can replace 'any' with a more specific type if known
  handleClick?: (event: any) => void; // Adjust the type as needed
}


export default function DatesCard({ item, handleClick }: DatesCardProps) {
  return (
    <View className="relative justify-center items-center">
      <TouchableWithoutFeedback onPress={() => handleClick && handleClick(item)}>
        <Image
          source={item.imgUrl}
          style={{
            width: width * 0.92,
            height: height * 0.75,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40%", // Yüksekliği optimize edin
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View className="absolute bottom-10 justify-start w-full items-start pl-4">
        <View className="flex-row justify-center items-center">
          <Text className="text-2xl text-white font-bold">
            {item.name} {item.lastName}
            {", "}
          </Text>
          <Text className="text-2xl text-white font-bold mr-2">{item.age}</Text>
          <CheckBadgeIcon size={25} color={"#3B82F6"} />
        </View>

        {/* Location */}
        <View className="flex-row justify-center items-center">
          <Text className="text-lg text-white font-regular">
            {item.city}
            {", "}
          </Text>
          <Text className="text-lg text-white font-regular mr-2">{item.country}</Text>
        </View>
      </View>
    </View>
  );
}
