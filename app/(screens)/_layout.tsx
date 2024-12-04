import { Tabs } from "expo-router";
import { Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="Home" 
                options={{ 
                    title: 'Home', 
                    headerTitleAlign: 'center',
                    tabBarIcon: ({focused}) => <FontAwesome name="home" size={25}  color={focused ? "#3B82F6" : "gray"} />,
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }} 
            />
              <Tabs.Screen 
                name="Chats" 
                options={{ 
                    title: 'Chat', 
                    headerTitleAlign: 'center',
                    tabBarIcon: ({focused}) =><Ionicons name="chatbubbles-outline" size={24} color={focused ? "#3B82F6" : "gray"} />,
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,
                }} 
            />
         
           
        </Tabs>
    )
}