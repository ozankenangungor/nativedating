import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const AppleSignInButton = () => {
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      if (identityToken) {
        // Identity token ve nonce ile backend'inize istek yaparak kullanıcıyı doğrulayın
        console.log(identityToken, nonce);
      } else {
        // Giriş başarısız oldu
        console.log('Apple Sign-In başarısız oldu.');
      }
    } catch (error) {
      console.error('Apple Sign-In hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <AppleButton
        style={styles.appleButton}
        cornerRadius={15}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={onAppleButtonPress}
        textStyle={styles.appleButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 50,
    width:'100%',
    fontSize: 16,

    
  },
  appleButton: {
    width: '100%',
    height: 60,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppleSignInButton;
