import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Children} from 'react';
import Icon from './Icon';
import {colors} from '../style/colors';

export default function Button({
  onPress,
  theme = 'primary',
  text,
  iconName,
  iconColor,
  iconSize,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].container}>
      {!!text && <Text style={styles[theme].btnText}>{text}</Text>}
      {!!iconName && (
        <Icon iconName={iconName} iconColor={iconColor} iconSize={iconSize} />
      )}
    </TouchableOpacity>
  );
}

const base_style = {
  container: {
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  primary: {
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.mainOrange,
      marginHorizontal: 'auto',
      marginTop: 10,
      paddingHorizontal: 20,
      minWidth: 250,
    },
  },
  secondary: {
    ...base_style,
    container: {
      ...base_style.container,
      paddingHorizontal: 20,
    },
    btnText: {
      color: colors.mainOrange,
    },
  },
  roomAddButton: {
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.mainOrange,
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
  },
  messageSendBtn: {
    ...base_style,
    container: {
      ...base_style.container,
      borderWidth: 1,
      paddingVertical: 10,
      borderColor: "darkgray",
      paddingHorizontal: 10,
      borderRadius: 20,
      marginLeft:5,
    },
    btnText: {
      color: colors.mainOrange,
    },
  },
  quaternary: {
    ...base_style,
  },
});
