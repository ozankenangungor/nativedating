import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link } from 'expo-router';
import Matches from '../../components/Matches';
import { chatData } from '../../constants/index';

const android = Platform.OS === 'android';

const ChatScreen = () => {
  const renderItem = ({ item }: any) => (
    <Link
      href={{
        pathname: '/(screens)/ChatDetailsScreen',
        params: {
          chat: JSON.stringify(item.chat),
          imgUrl: item.imgUrl,
          name: item.name,
          age: item.age,
        },
      }}
      asChild
    >
      <TouchableOpacity className="w-full py-3 items-center flex-row border-b border-neutral-300">
        {/* Avatar */}
        <View
          className="w-[17%] justify-center"
          style={{
            width: hp(7),
            height: hp(7),
          }}
        >
          <Image
            source={{ uri: typeof item.imgUrl === 'string' ? item.imgUrl : item.imgUrl[0] }} // Burada imgUrl'nin türünü kontrol ediyoruz
            style={{
              width: '90%',
              height: '90%',
            }}
            className="rounded-full"
          />
        </View>

        {/* Information */}
        <View
          className="w-[82%]"
          style={{
            height: hp(6),
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-center">
              <View className="flex-row">
                <Text className="font-bold text-base">{item.name}, </Text>
                <Text className="font-bold text-base mr-1">{item.age}</Text>
              </View>
              {item.isOnline && (
                <View className="justify-center items-center">
                  <View className="w-2 h-2 bg-[#F26322] rounded-full ml-1 justify-center items-center" />
                </View>
              )}
            </View>
            <Text className="text-sm tracking-tight">{item.timeSent}</Text>
          </View>
          <View>
            <Text className="font-semibold text-xs text-neutral-500">
              {item.lastMessage.length > 45
                ? item.lastMessage.slice(0, 45) + '...'
                : item.lastMessage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: android ? hp(3) : 0,
      }}
    >
      <View className="px-4">
        <Text className="uppercase font-semibold text-neutral-500 tracking-wider">
          Matches
        </Text>
      </View>
      <Matches />

      {/* Chat List */}
      <View className="px-4">
        <View className="border-b border-neutral-300 py-4">
          <Text className="uppercase font-semibold text-neutral-500 tracking-wider">
            Chat
          </Text>
        </View>

        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
