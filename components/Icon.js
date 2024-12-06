import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';


export default function Icon({iconName, iconColor, iconSize}) {
  return (
      <Icons name={iconName} color={iconColor} size={iconSize} />
  );
}

