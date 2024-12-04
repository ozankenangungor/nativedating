import React from 'react';
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BellIcon } from 'react-native-heroicons/outline';
import Swiper from 'react-native-deck-swiper';
import { Link, useRouter } from 'expo-router';
import DatesCard from '../../components/DatesCard';
import { datesData } from '../../constants';
import { user1 } from '../../assets/images';
import { profileVar } from '../../constants/reactive';
import { gql, useMutation } from '@apollo/client';

// GraphQL mutasyonu tanımlayın


const android = Platform.OS === 'android';
let { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="bg-white flex-1 justify-between"
      style={{
        paddingTop: android ? hp(2) : 0,
      }}
    >
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4">

      <View className="mx-2">
          <Text className=" text-2xl font-semibold">RIVYN</Text>
        </View>
        {/* Bell Icon */}
        <View className="bg-black/10 p-2 rounded-full items-center justify-center">
          <TouchableOpacity>
            <BellIcon size={25} strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View className="p flex-1">
       

        {/* Swiper Component */}
        <View style={{ flex: 1 }}>
          <Swiper
            cards={datesData}
            renderCard={(card) => <DatesCard item={card} />}
            onSwipedRight={() => {}} // Sağa kaydırıldığında fonksiyonu tetikleyin
            onSwipedAll={() => console.log('All cards swiped')}
            cardIndex={0}
            cardVerticalMargin={10}
            backgroundColor="transparent"
            stackSize={2}
            stackSeparation={10}
       
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

