import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import RoomAddModal from '../components/Rooms/RoomAddModal';
import database from '@react-native-firebase/database';
import RoomItem from '../components/Rooms/RoomItem';
import RoomList from '../components/Rooms/RoomList';
import parseRoomsData from '../utils/parseRoomsData';

export default function RoomsPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
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
      });
      console.log('added');
    } catch (e) {
      console.log(e.code);
    }
  }

  return (
    <View style={styles.container}>
      <RoomList data={rooms}/>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
