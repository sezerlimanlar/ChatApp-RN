import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {signInWithPhoneNumber} from '@react-native-firebase/auth';

export default function RoomDetailPage() {
  const {item} = useRoute().params; // useRoute ile route bilgisini alıyoruz
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.roomName} isimli oda x tarafından oluşturuldu.
      </Text>
      <TextInput style={styles.messageInput} placeholder="Mesaj" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  messageInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius:10,
  },
});
