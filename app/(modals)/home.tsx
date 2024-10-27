import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { useCreateUser } from '@/hooks/useCreateUser';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedInVar } from '@/constants/authenticated';
import FormNavigator from '@/components/FormNavigator';
import WelcomeHeader from '@/components/WelcomeHeader';
const Page = () => {

  const router = useRouter();



  const[createUser]  = useCreateUser();

  const handleSignUp = async () => {
    try {
      const { data } = await createUser({ variables: { createUserInput: { email, password } } });

      // Kullanıcı oluşturulduysa oturum bilgilerini AsyncStorage'a kaydet
      if (data) { // Assuming 'data' is the user object
        console.log(data);
        await AsyncStorage.setItem('userSession', JSON.stringify(data));
        isLoggedInVar(true);
        router.replace('/(tabs)'); 
      }
    } catch (error) {
      console.error("Kayit sirasinda hata:", error);
    }
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <WelcomeHeader/>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
      autoCapitalize='none'
      placeholder='Password'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        value={password}
        onChangeText={setPassword}
      />


      <TouchableOpacity style={defaultStyles.btn} onPress={() => handleSignUp()}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        
        <Text style={styles.seperator}></Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <FormNavigator leftTitle="Do you already have an account?" rightTile='Sign in' onLeftPress={() => router.replace('/(modals)/login' as Href) } onRightPress={() => handleSignUp()}/>

      <View style={{ gap: 20 }}>
        {/* <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity> */}
{/* 
        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} >
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
    justifyContent: 'center',
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
