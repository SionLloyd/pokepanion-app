import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';

const GameScreen = ({ navigation }) => {
  const [vStarFlippedPlayer1, setVStarFlippedPlayer1] = useState(true)
  const [lostZonePlayer1, setLostZonePlayer1] = useState(0)
  const [winCountPlayer1, setWinCountPlayer1] = useState(0)
  
  const [vStarFlippedPlayer2, setVStarFlippedPlayer2] = useState(true)
  const [lostZonePlayer2, setLostZonePlayer2] = useState(0)
  const [winCountPlayer2, setWinCountPlayer2] = useState(0)

  useEffect(() => {
    if (winCountPlayer1 === 2 || winCountPlayer2 === 2) {
      let player = winCountPlayer1 === 2 ? 'Player 1' : 'Player 2'

      Alert.alert('Congratulations!', `${player} won the match!`)
      navigation.pop()
    }
  }, [winCountPlayer1, winCountPlayer2])

  return (
    <View style={{ flex: 1, backgroundColor: '#56be6d' }}>
      <ImageBackground style={{ flex: 1 }} resizeMode={'contain'} source={{uri: 'https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png'}}>
        <View style={{ flex: 1, borderTopWidth: 5, borderColor: '#4b4c4d', alignItems: 'center', justifyContent: 'space-around', transform: [{rotate: '-180deg'}]}}>
          <View style={{ shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3 }}>
            <Pressable onPress={() => { setVStarFlippedPlayer1(!vStarFlippedPlayer1)}}>
              <Image
                style={{height: 100, width: 200, borderRadius: 10}}
                resizeMode='stretch'
                source={{uri: vStarFlippedPlayer1 ? 'https://pbs.twimg.com/media/FJhEksvXIAUKlkb?format=jpg&name=4096x4096' : 'https://cdn.wallpapersafari.com/89/47/eLChZc.png'}}
              />
            </Pressable>
          </View>

          <View style={{ position: 'absolute', left: 5, top: 20, alignItems: 'center' }}>
            <Text>
              {winCountPlayer1}
            </Text>
            <Pressable style={{ padding: 10 }} onPress={() => {setWinCountPlayer1(winCountPlayer1 + 1)}}>
              <Image
                style={{height: 50, width: 50}}
                resizeMode='contain'
                source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/08/Plusle_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104402'}}
              />
            </Pressable>
            <Text>
              Wins
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ paddingBottom: 10 }}>
              Lost Zone Count
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200, backgroundColor: 'white', borderRadius: 20 }}>
              <Pressable onPress={() => {setLostZonePlayer1(lostZonePlayer1 - 1)}}>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode='contain'
                  source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/04/Minun_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104421'}}
                />
              </Pressable>
              <Text>
                {lostZonePlayer1}
              </Text>
              <Pressable onPress={() => {setLostZonePlayer1(lostZonePlayer1 + 1)}}>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode='contain'
                  source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/08/Plusle_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104402'}}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, borderTopWidth: 5, borderColor: '#4b4c4d', alignItems: 'center', justifyContent: 'space-around'}}>
          <View style={{ shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3 }}>
            <Pressable onPress={() => { setVStarFlippedPlayer2(!vStarFlippedPlayer2)}}>
              <Image
                style={{height: 100, width: 200, borderRadius: 10}}
                resizeMode='stretch'
                source={{uri: vStarFlippedPlayer2 ? 'https://pbs.twimg.com/media/FJhEksvXIAUKlkb?format=jpg&name=4096x4096' : 'https://cdn.wallpapersafari.com/89/47/eLChZc.png'}}
              />
            </Pressable>
          </View>

          <View style={{ position: 'absolute', right: 5, top: 20, alignItems: 'center' }}>
            <Text>
              {winCountPlayer2}
            </Text>
            <Pressable style={{ padding: 10 }} onPress={() => {setWinCountPlayer2(winCountPlayer2 + 1)}}>
              <Image
                style={{height: 50, width: 50}}
                resizeMode='contain'
                source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/08/Plusle_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104402'}}
              />
            </Pressable>
            <Text>
              Wins
            </Text>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Text style={{ paddingBottom: 10 }}>
              Lost Zone Count
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200, backgroundColor: 'white', borderRadius: 20 }}>
              <Pressable onPress={() => {setLostZonePlayer2(lostZonePlayer2 - 1)}}>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode='contain'
                  source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/04/Minun_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104421'}}
                />
              </Pressable>
              <Text>
                {lostZonePlayer2}
              </Text>
              <Pressable onPress={() => {setLostZonePlayer2(lostZonePlayer2 + 1)}}>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode='contain'
                  source={{uri: 'https://static.wikia.nocookie.net/pokemon-cafe-mix/images/0/08/Plusle_Icon.png/revision/latest/scale-to-width-down/150?cb=20200710104402'}}
                />
              </Pressable>
            </View>
          </View>
          
        </View>
      </ImageBackground>
    </View>
  );
}

export default GameScreen