import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Button from '../Button';
import {colors} from '../../style/colors';

export default function RoomAddModal({onClose, visible, onSend}) {
  const [roomInfo, setRoomInfo] = useState({roomName: '', roomPassword: ''});

  function handleSend() {
    if (!roomInfo.roomName || !roomInfo.roomPassword) {
      return; // Eğer başlık veya içerik boşsa, geri dön.
    }
    onSend(roomInfo);
    setRoomInfo({roomName: '', roomPassword: ''}); // State'i sıfırla
  }

  return (
    <Modal
      style={styles.modal}
      swipeDirection="down"
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Yeni Bir Sohbet Odası Oluştur</Text>
          <TextInput
            style={styles.input}
            placeholder="Oda Adı Girin"
            onChangeText={value => setRoomInfo({...roomInfo, roomName: value})}
            value={roomInfo.roomName}
          />
          <TextInput
            onChangeText={value =>
              setRoomInfo({...roomInfo, roomPassword: value})
            }
            value={roomInfo.roomPassword}
            style={styles.input}
            placeholder="Odaya Özel Bir Şifre Belirleyin"
            secureTextEntry // Şifre girişi olduğunu belirtiyoruz
          />
          <Button onPress={handleSend} text="Odayı Oluştur" />
        </View>
      </View>
    </Modal>
  );
}

const deviceSize = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: 20,
    borderRadius: 10,
    height: deviceSize.height / 3,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  modal: {
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(116, 116, 116, 0.16)',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.mainOrange,
  },
});
