import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Message from '../components/Message';
import Button from '../components/Button'; // Buton bileşeni
import {colors} from '../style/colors';
import database from '@react-native-firebase/database';
import parseRoomsData from '../utils/parseRoomsData';
import {useAuthContext} from '../context/AuthContext';

export default function RoomDetailPage() {
  const {item} = useRoute().params; // useRoute ile route bilgisini alıyoruz
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const {user} = useAuthContext();

  useEffect(() => {
    database()
      .ref(`/rooms/${item.id}/messages`)
      .on('value', snapshot => {
        const parsedData = parseRoomsData(snapshot.val());
        const sortedMessages = parsedData?.sort(
          (a, b) => a.timestamp - b.timestamp,
        );
        setAllMessages(sortedMessages);
      });
  }, []);

  async function sendMessageHandler() {
    try {
      const newReference = database().ref(`/rooms/${item.id}/messages`).push();
      await newReference.set({
        text: message,
        senderUserName: user.email.split('@')[0],
        senderId: user.uid, // Mesajı gönderen kullanıcının ID'si
        timestamp: database.ServerValue.TIMESTAMP, // Mesajın gönderildiği zaman
      });

      setMessage(''); // Mesaj gönderildikten sonra inputu temizle
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.roomName} isimli oda {user.email.split('@')[0]} tarafından
        oluşturuldu.
      </Text>

      {/* Mesajlar burada listeleniyor */}
      <FlatList
        data={allMessages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Message
            text={item.text}
            isSender={item.senderId}
            senderName={item.senderUserName}
            timestamp={item.timestamp}
          />
        )}
        style={styles.messageList}
      />

      {/* Mesaj yazma kutusu ve buton aynı satırda */}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          placeholder="Mesaj"
        />
        <Button
          iconName="send-o"
          iconSize={18}
          iconColor={colors.mainOrange}
          theme="messageSendBtn"
          style={styles.sendBtn}
          onPress={sendMessageHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', // Title yukarıda, mesaj kutusu en aşağıda
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  messageList: {
    flex: 1, // Mesaj listesi dinamik olarak alanı kaplar
  },
  inputContainer: {
    flexDirection: 'row', // Yan yana yerleşim sağlar
    alignItems: 'center', // Buton ve input hizalaması
    paddingVertical: 10,
  },
  messageInput: {
    flex: 1, // Input genişliği butona göre ayarlanır
    borderWidth: 1,
    borderColor: 'darkgray',
    padding: 10,
    borderRadius: 10,
  },
  sendBtn: {
    padding: 10,
    borderRadius: 10,
  },
});
