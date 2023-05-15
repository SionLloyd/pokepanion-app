import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MatchReport = ({ navigation, route }) => {

  const [round, setRound] = React.useState('')
  const [deckName, setDeckName] = React.useState('')
  const [record, setRecord] = React.useState('')
  const [matchReport, setMatchReport] = React.useState('')

  useEffect(() => {
    if (route.params?.roundParse) {
      setRound(route.params.roundParse.round)
      setDeckName(route.params.roundParse.deckName)
      setRecord(route.params.roundParse.record)
      setMatchReport(route.params.roundParse.matchReport)
    }
  }, [])

  /**
   * Creates a new match report and adds it to the existing match reports
   * @param result 
   */
  const saveDataToStorage = async (result: string) => {
    try {
      const existingRounds = await getDataFromStorage()
      const currentRound = JSON.stringify({ round: round, deckName: deckName, record: record, matchReport: matchReport, result: result })
      const updatedRounds = [ ...existingRounds, currentRound]
      await AsyncStorage.setItem('@match_reports', JSON.stringify(updatedRounds))
    } catch (error) {
      console.log('OH NO!', error)
    }
  }

  /**
   * Gets the array of match reports
   * @returns 
   */
  const getDataFromStorage = async () => {
    try {
      const existingRounds = await AsyncStorage.getItem('@match_reports')
      if (existingRounds) {
        return JSON.parse(existingRounds)
      } else {
        return []
      }
    } catch (error) {
      console.log('OH NO!', error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center' }}>
      <Pressable style={{ flex: 1, justifyContent: 'flex-end' }} onPress={Keyboard.dismiss}>

        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Round
              </Text>
            </View>
            <TextInput
              editable={route.params?.roundParse ? false : true}
              onChangeText={setRound}
              placeholder=' Round Number'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              keyboardType='number-pad'
              value={round}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Deck
              </Text>
            </View>
            <TextInput
              editable={route.params?.roundParse ? false : true}
              onChangeText={setDeckName}
              placeholder=' Opponents Deck'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderLeftWidth: 1, borderRightWidth: 1 }}
              value={deckName}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                BO3
              </Text>
            </View>
            <TextInput
              editable={route.params?.roundParse ? false : true}
              onChangeText={setRecord}
              placeholder=' Round Record'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              value={record}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text>
            Match Report
          </Text>
          <TextInput
            editable={route.params?.roundParse ? false : true}
            onChangeText={setMatchReport}
            placeholder='Fill in your match report with bragging rights, missplays or interesting techs your opponent had!'
            placeholderTextColor='grey'
            style={{ height: 40, flex: 1, borderWidth: 1 }}
            multiline
            value={matchReport}
          />
        </View>

        {!route.params?.roundParse && (
          <View style={{ height: 80, width: Dimensions.get('window').width, flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }}>

            <Pressable 
              style={{ flex: 1, borderRadius: 25, backgroundColor: '#32d93a', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5  }}
              onPress={async () => {
                await saveDataToStorage('Win')
                navigation.navigate('Tournament')
            }}>
              <Image
                style={{height: 30, width: 30}}
                resizeMode='contain'
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/87/87932.png'}}
              />
              <Text>
                Win
              </Text>
            </Pressable>

            <Pressable
              style={{ flex: 1, borderRadius: 25, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5  }}
              onPress={async () => {
                await saveDataToStorage('Tie')
                navigation.navigate('Tournament')
            }}>
                <Image
                  style={{height: 30, width: 30}}
                  resizeMode='contain'
                  source={{ uri: 'https://static.thenounproject.com/png/3670439-200.png'}}
                />
                <Text>
                  Tie
                </Text>
            </Pressable>

            <Pressable
              style={{ flex: 1, borderRadius: 25, backgroundColor: '#d93232', borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5  }}
              onPress={async () => {
                await saveDataToStorage('Loss')
                navigation.navigate('Tournament')
            }}>
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
        )}

      </Pressable>
    </SafeAreaView>
  );
}

export default MatchReport