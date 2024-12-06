import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

export default function ProfilePage({navigation}) {
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      showMessage({
        message: 'Çıkış Yapıldı',
        type: 'success',
      });
      navigation.navigate('AuthStack', { screen: 'LoginPage' });

    } catch (error) {
      showMessage({
        message: 'Çıkış Yaparken Bir Sorunla Karşılaşıldı',
        type: 'danger',
      });
    }
  };

  return (
    <View>
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View style={styles.logoutContainer}>
        <Button
          theme="secondary"
          iconName="sign-out"
          iconColor="black"
          iconSize={48}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    marginHorizontal: 'auto',
    borderRadius: 20,
    backgroundColor: 'rgb(168, 65, 65)',
  },
});
