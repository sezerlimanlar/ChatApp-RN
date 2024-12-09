import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RoomItem from './RoomItem';
import {colors} from '../../style/colors';

export default function RoomList({data,selectRoom}) {
  return (
    <>
      <Text style={styles.text}>SOHBET ODALARI</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <RoomItem item={item} selectRoom={()=> selectRoom(item)} />;
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 32, // Biraz daha küçük font, forum tarzına uygun
    fontWeight: 'bold', // Orta kalınlık
    textAlign: 'center', // Sol tarafa hizalanmış metin
    color: colors.mainOrange, // Metni ana renkle vurgulama
  },
});

