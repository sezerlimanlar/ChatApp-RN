import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import RoomAddModal from '../components/Rooms/RoomAddModal';
import database from '@react-native-firebase/database';
import RoomList from '../components/Rooms/RoomList';
import parseRoomsData from '../utils/parseRoomsData';
import RoomPasswordModal from '../components/Rooms/RoomPasswordModal';

export default function RoomsPage({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Seçilen odayı tutacak
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // Şifre modalı görünürlüğü

  function toggleHandler() {
    setModalVisible(!isModalVisible);
  }

  useEffect(() => {
    database()
      .ref('/rooms')
      .on('value', snapshot => {
        const parsedData = parseRoomsData(snapshot.val());
        setRooms(parsedData);
      });
  }, []);

  async function createRoomHandler(room) {
    try {
      const newReference = database().ref('/rooms').push();
      await newReference.set({
        roomName: room.roomName,
        roomPassword: room.roomPassword,
        createdUserId: room.createdUserId,
      });
      setModalVisible(!isModalVisible);
    } catch (e) {
      console.log(e.code);
    }
  }

  function GoToDetailPageHandler(item) { //roomlist compenentinde ilgili odayı state'e ayarladık
    setSelectedRoom(item); // Seçilen odayı state'e at
    setPasswordModalVisible(true); // Şifre modalını aç
  }

  function handlePasswordSubmit(inputPassword) {
    if (inputPassword === selectedRoom.roomPassword) {
      setPasswordModalVisible(false); // Modalı kapat
      navigation.navigate('RoomDetailPage', {item: selectedRoom}); // Oda detayına git
    } else {
      Alert.alert("UYARI","Geçersiz Parola!",[{text:"Tekrar Dene"}]); // Yanlış şifre
    }
  }

  return (
    <View style={styles.container}>
      <RoomList data={rooms} selectRoom={GoToDetailPageHandler} />
      <Button
        theme="roomAddButton"
        iconName="plus"
        iconColor="white"
        iconSize={24}
        onPress={toggleHandler}
      />

      <RoomAddModal
        onClose={toggleHandler}
        visible={isModalVisible}
        onSend={createRoomHandler}
      />

      <RoomPasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSubmit={handlePasswordSubmit} // Şifre doğrulama işlemi
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
