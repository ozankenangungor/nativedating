import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const ChatDetailsScreen = () => {
  const { chat, imgUrl, name, age } = useLocalSearchParams();
  const parsedChat = JSON.parse(chat as string);

  const [messages, setMessages] = useState(parsedChat.messages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sentAt: new Date().toISOString(),
        isSentByMe: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderItem = ({ item }: any) => (
    <View
      className={`${
        item.isSentByMe ? 'self-end bg-blue-100' : 'self-start bg-white'
      } p-2 rounded-lg my-1`}
    >
      <Text>{item.text}</Text>
      <Text className="text-xs text-gray-500">{item.sentAt}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center p-2 border-b border-gray-300">
        <Image
          source={{ uri: imgUrl as string }}
          className="w-12 h-12 rounded-full mr-2"
        />
        <View>
          <Text className="font-bold text-lg">{name}</Text>
          <Text className="text-base">{age} years old</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        className="p-2"
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        className="flex-row items-center border-t border-gray-300 p-2"
      >
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          className="flex-1 bg-gray-200 rounded-full px-3 py-2"
        />
        <TouchableOpacity onPress={handleSendMessage} className="ml-2">
          <Text className="text-blue-600 font-bold">Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailsScreen;
