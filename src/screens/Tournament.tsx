import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tournament = ({ navigation }) => {

  const [playerName, setPlayerName] = React.useState('')
  const [eventName, setEventName] = React.useState('')
  const [deckName, setDeckName] = React.useState('')
  const arr = ['playerName', 'eventName', 'deckName']
  const rounds = [{roundNumber: 1, deckPlayed: 'Lost Box Stone', record: 'WW'}]


  useEffect(() => {
    arr.forEach(element => {
      getDataFromStorage(element)
    })
  }, [])

  /**
   * Function to get a String value to AsyncStorage
   * @param key 
   * @param data 
   */
  const getDataFromStorage = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(`@${key}`)
      setValueInState(key, data)
    } catch (error) {
      console.log('OH NO!', error)
    }
  }

  /**
   * Function to save a String value to AsyncStorage
   * @param key 
   * @param data 
   */
  const saveDataToStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(`@${key}`, data)
      setValueInState(key, data)
    } catch (error) {
      console.log('OH NO!', error)
    }
  }

  /**
   * Function to take the key and set the value in state
   * @param key 
   * @param data 
   */
  const setValueInState = (key: string, data: any) => {
    if (data !== null) {
      switch (key) {
        case 'playerName':
          setPlayerName(data)
          break
        case 'eventName':
          setEventName(data)
          break
        case 'deckName':
          setDeckName(data)
          break
        default:
          console.log('UH OH! Key not found')
          break;
      }
    }
  }

  /**
   * Clear all data from ASyncStorage
   */
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log('Error! Failed to clear all')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F2F2' }}>
      <ScrollView style={{ flex: 1, borderStartColor: 'green' }}>

        <View style={{ flex: 1, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Name
              </Text>
            </View>
            <TextInput
              onChangeText={(data) => saveDataToStorage('playerName', data)}
              placeholder=' Your name'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              value={playerName}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Event
              </Text>
            </View>
            <TextInput
              onChangeText={(data) => saveDataToStorage('eventName', data)}
              placeholder=' Event name'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderLeftWidth: 1, borderRightWidth: 1 }}
              value={eventName}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 50, alignItems: 'center', justifyContent: 'center',  }}>
              <Text>
                Deck
              </Text>
            </View>
            <TextInput
              onChangeText={(data) => saveDataToStorage('deckName', data)}
              placeholder=' Deck choice'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              value={deckName}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            0-0-0
          </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            0pts
          </Text>
        </View>


        <View style={{ flex: 1, paddingTop: 10 }}>

          {
            rounds.map((round) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, borderWidth: 2, borderColor: 'black', marginHorizontal: 10 }}>
                  <Text style={{ paddingLeft: 5 }}>
                    {round.roundNumber}
                  </Text>
                  <Text>
                    {round.deckPlayed}
                  </Text>
                  <Text>
                    {round.record}
                  </Text>
                  <View style={{ paddingRight: 5 }}>
                    <Pressable onPress={() => navigation.navigate('MatchReport')}>
                      <Text>
                        Edit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )
            })
          }

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingTop: 10 }}>
            <Pressable onPress={() => navigation.navigate('MatchReport')} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                + Add a round
              </Text>
            </Pressable>
          </View>

        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', paddingTop: 10 }}>
          <Pressable onPress={() => clearAll()} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              Clear tournament
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Tournament