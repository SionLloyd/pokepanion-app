import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

const MatchReport = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>

        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Round
              </Text>
            </View>
            <TextInput
              //onChangeText={(data) => saveDataToStorage('playerName', data)}
              placeholder=' Round Number'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              keyboardType='number-pad'
              //value={playerName}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Deck
              </Text>
            </View>
            <TextInput
              //onChangeText={(data) => saveDataToStorage('eventName', data)}
              placeholder=' Opponents Deck'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderLeftWidth: 1, borderRightWidth: 1 }}
              //value={eventName}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                BO3
              </Text>
            </View>
            <TextInput
              //onChangeText={(data) => saveDataToStorage('deckName', data)}
              placeholder=' Round Record'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              //value={deckName}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text>
            Match Report
          </Text>
          <TextInput
            //onChangeText={(data) => saveDataToStorage('deckName', data)}
            placeholder='Fill in your match report with bragging righs, missplays or interesting techs your opponent had!'
            placeholderTextColor='grey'
            style={{ height: 40, flex: 1, borderWidth: 1 }}
            multiline
            //value={deckName}
          />
        </View>

        <View style={{ height: 80, width: Dimensions.get('window').width, flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>

          <View style={{ flex: 1, flexDirection: 'row', borderRadius: 25, backgroundColor: 'green', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={() => navigation.navigate('MatchReport')}>
              <Image
                style={{height: 30, width: 30}}
                resizeMode='contain'
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}}
              />
              <Text>
                Win
              </Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, borderRadius: 25, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Pressable onPress={() => navigation.navigate('MatchReport')}>
              <Image
                style={{height: 30, width: 30}}
                resizeMode='contain'
                source={{ uri: 'https://static.thenounproject.com/png/3670439-200.png'}}
              />
              <Text>
                Tie
              </Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, borderRadius: 25, backgroundColor: 'red', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={() => navigation.navigate('MatchReport')}>
              <Image
                style={{height: 30, width: 30}}
                resizeMode='contain'
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/45/45372.png'}}
              />
              <Text>
                Loss
              </Text>
            </Pressable>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

export default MatchReport