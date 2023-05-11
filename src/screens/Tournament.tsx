import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
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

const Tournament = ({ navigation, route }) => {

  enum roundResult {
    Win = 'Win',
    Tie = 'Tie',
    Loss = 'Loss'
  }

  const [playerName, setPlayerName] = React.useState('')
  const [eventName, setEventName] = React.useState('')
  const [deckName, setDeckName] = React.useState('')
  const [rounds, setRounds] = React.useState([])
  const [record, setRecord] = React.useState('')
  const [points, setPoints] = React.useState(0)
  const [isLoading, setLoading] = useState(true)

  const arr = ['playerName', 'eventName', 'deckName']

  useEffect(() => {
    arr.forEach(element => {
      getDataFromStorage(element)
    })
  }, [])

  useEffect(() => {
    // FIXME
    getMatchReports()
    console.log('useEffect called 2')
  })

  /**
   * Get all the match reports for the tournament
   * @returns 
   */
  const getMatchReports = async () => {
    async function getMatches() {
      try {
        const existingRounds = await AsyncStorage.getItem('@match_reports')
        if (existingRounds) {
          const parse = JSON.parse(existingRounds)
          return parse
        } else {
          console.log('[]')
          return []
        }
      } catch (error) {
        console.log('OH NO!', error)
      }
    }

    const matches = await getMatches()
    let arr = []
    matches?.forEach(match => {
      arr.push(JSON.parse(match))
    })

    setRounds(arr)

    const recordAndPoints = await calculateRecordAndPoints(arr)
    setRecord(recordAndPoints[0])
    setPoints(recordAndPoints[1])
    setLoading(false)
  }

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
      setLoading(true)
      await AsyncStorage.clear()
      setRounds([])
      setRecord('0-0-0')
      setPoints(0)
    } catch(e) {
      console.log('Error! Failed to clear all')
    }
  }

  /**
   * Function to calculate the user's current tournament record and match points
   * @param matches 
   * @returns 
   */
  const calculateRecordAndPoints = async (matches: any) => {
    var currentPoints = 0
    var wins = 0
    var losses = 0
    var ties = 0
    matches.forEach((match) => {
      if (match.result === roundResult.Win) {
        currentPoints += 3
        wins += 1
      } else if (match.result === roundResult.Tie) {
        currentPoints += 1
        ties += 1
      } else {
        currentPoints += 0 // ?
        losses += 1
      }
    })
    const record = `${wins}-${losses}-${ties}`
    return [record, currentPoints]
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F2F2' }}>
      <ScrollView style={{ flex: 1, borderStartColor: 'green' }}>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator
              animating
              color={'red'}
              size={'large'}
            />
          </View>
        ) : (
          <>
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
              {record}
            </Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {points}pts
            </Text>
          </View>


          <View style={{ flex: 1, paddingTop: 10 }}>

            {
              rounds.map((round) => {
                const roundColor = round.result === roundResult.Win ? '#32d93a' : round.result === roundResult.Loss ? '#d93232' : 'white'
                return (
                  <View style={{ backgroundColor: 'white', margin: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, marginHorizontal: 10, shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, borderRadius: 10 }}>
                    <View style={{ backgroundColor: roundColor, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderColor: 'black', borderWidth: 1 }}>
                      <Text>
                        {round.round}
                      </Text>
                    </View>
                    <Text>
                      {round.deckName}
                    </Text>
                    <Text>
                      {round.record}
                    </Text>
                    <View style={{ paddingRight: 5, flexDirection: 'row' }}>
                      <Pressable onPress={() => navigation.navigate('MatchReport', { roundParse: round })}>
                        <Image
                          style={{height: 30, width: 30}}
                          resizeMode='cover'
                          source={{uri: 'https://endlessicons.com/wp-content/uploads/2012/11/view-icon-614x460.png'}}
                        />
                      </Pressable>
                    </View>
                  </View>
                )
              })
            }

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingTop: 10 }}>
              <Pressable 
                style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }} 
                onPress={() => {
                  setLoading(true)
                  navigation.navigate('MatchReport')
                }} 
              >
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
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

export default Tournament