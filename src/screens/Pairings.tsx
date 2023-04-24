import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';

const Pairings = ({ navigation }) => {
  const [vStarFlippedPlayer1, setVStarFlippedPlayer1] = useState(true)
  const [lostZonePlayer1, setLostZonePlayer1] = useState(0)
  
  const [vStarFlippedPlayer2, setVStarFlippedPlayer2] = useState(true)
  const [lostZonePlayer2, setLostZonePlayer2] = useState(0)


  return (
    <View style={{ flex: 1, backgroundColor: 'cyan' }}>

    </View>
  );
}

export default Pairings