import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

const Social = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Coming Soon...
      </Text>
      <View style={{padding: 50}}>
        <Image
          style={{height: 200, width: 200}}
          resizeMode='contain'
          source={{uri: 'https://archives.bulbagarden.net/media/upload/6/61/Red_on_computer.png'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default Social