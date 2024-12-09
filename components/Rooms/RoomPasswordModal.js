import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../Button';

export default function RoomPasswordModal({visible, onClose, onSubmit}) {
  const [inputPassword, setInputPassword] = useState('');

  function handleSubmit() {
    onSubmit(inputPassword); // Girilen şifreyi üst bileşene iletir
    setInputPassword(''); // Giriş alanını temizler
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Oda Şifresini Girin</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry
        />
        <Button text="Doğrula" onPress={handleSubmit} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
