import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import RoomAddModal from '../components/Rooms/RoomAddModal';

export default function RoomsPage() {
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleHandler() {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={styles.container}>
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
        onSend={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
