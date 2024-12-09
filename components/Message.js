import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthContext} from '../context/AuthContext';
import formatDate from '../utils/formatDate';

export default function Message({text, isSender, timestamp, senderName}) {
  const {user} = useAuthContext();
  

  return (
    <View
      style={[
        styles.container,
        isSender === user.uid ? styles.sender : styles.receiver,
      ]}>
      <View style={styles.messageBubble}>
        <Text style={styles.senderName}>~{senderName}</Text>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timestamp}>{formatDate(timestamp)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  sender: {
    justifyContent: 'flex-end', // Sağ tarafa hizalama (gönderen)
  },
  senderName:{
    fontSize:12,
    marginBottom:5,
  },
  receiver: {
    justifyContent: 'flex-start', // Sol tarafa hizalama (alan kişi)
  },
  messageBubble: {
    maxWidth: '75%',
    minWidth:150, // Mesaj baloncuğunun genişliği sınırlı
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DCF8C6', // WhatsApp tarzı açık yeşil baloncuk (gönderen)
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#000', // Mesaj yazısı
  },
  timestamp: {
    fontSize: 12,
    color: '#555', // Zaman etiketi için gri renk
    textAlign: 'right',
    marginTop: 5,
  },
  receiverMessageBubble: {
    backgroundColor: '#EAEAEA', // Alıcı için gri baloncuk rengi
  },
});
