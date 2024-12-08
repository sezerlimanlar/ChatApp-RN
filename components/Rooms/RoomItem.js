import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../style/colors';
import Icon from '../Icon';
import {useNavigation} from '@react-navigation/native';

export default function RoomItem({item}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate('RoomDetailPage', {item})}>
      <View style={styles.container}>
        <View style={styles.room}>
          <Text style={styles.text}>{item.roomName}</Text>
          <Icon
            iconName="chevron-right"
            iconSize={24}
            iconColor={colors.mainOrange}></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, // Her öğenin arasında dikey boşluk
    paddingHorizontal: 20, // Ekranın kenarlarına daha fazla boşluk
  },
  room: {
    borderWidth: 1,
    borderColor: colors.mainOrange, // Sınır rengini vurgulamak için ana renk
    borderRadius: 8, // Hafif kavisli kenarlar
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Beyaz arka plan, forum stiline daha yakın
    paddingVertical: 15, // İçerik etrafında daha fazla boşluk
    paddingHorizontal: 10, // Yatayda daha fazla boşluk
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18, // Biraz daha küçük font, forum tarzına uygun
    fontWeight: '500', // Orta kalınlık
    textAlign: 'left', // Sol tarafa hizalanmış metin
    color: colors.mainOrange, // Metni ana renkle vurgulama
  },
});
