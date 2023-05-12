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

//https://www.mtgsalvation.com/forums/magic-fundamentals/magic-general/325775-making-the-cut-in-swiss-tournaments#c6

const Calculator = ({ navigation }) => {

  const [numberOfPlayers, setNumberOfPlayers] = useState('')
  const [numberOfRounds, setNumberOfRounds] = useState('')
  const [eventTopCut, setEventTopCut] = useState('')

  const [cutOff, setCutOff] = useState('')
  const [p0, setP0] = useState('')
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [p3, setP3] = useState('')
  const [p4, setP4] = useState('')
  const [p5, setP5] = useState('')

  const calculateTopCut = (players: String, rounds: String, topCut: String) => {
    const playersNumber = Number(players)
    const roundsNumber = Number(rounds)
    const topCutNumber = Number(topCut)

    // I hate this
    let p0 = (playersNumber / (2 ** roundsNumber))
    let p1 = p0 * roundsNumber
    let p2 = p0 * (roundsNumber * ((roundsNumber - 1) / 2))
    let p3 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3))
    let p4 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3) * ((roundsNumber - 3) / 4))
    let p5 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3) * ((roundsNumber - 3) / 4) * ((roundsNumber - 4) / 5))
    let p6 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3) * ((roundsNumber - 3) / 4) * ((roundsNumber - 4) / 5) * ((roundsNumber - 5) / 6))
    let p7 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3) * ((roundsNumber - 3) / 4) * ((roundsNumber - 4) / 5) * ((roundsNumber - 5) / 6) * ((roundsNumber - 6) / 7))
    let p8 = p0 * (roundsNumber * ((roundsNumber - 1) / 2) * ((roundsNumber - 2) / 3) * ((roundsNumber - 3) / 4) * ((roundsNumber - 4) / 5) * ((roundsNumber - 5) / 6) * ((roundsNumber - 6) / 7) * ((roundsNumber - 7) / 8))

    let calcTopCut = 0

    if (p0 <= topCutNumber) {
      calcTopCut += p0
      setP0(p0.toString())
      console.log('p0')
      if ((calcTopCut + p1) <= topCutNumber) {
        calcTopCut += p1
        setP1(p1.toString())
        console.log('p1')
        if ((calcTopCut + p2) <= topCutNumber) {
          calcTopCut += p2
          setP2(p2.toString())
          console.log('p2')
          if ((calcTopCut + p3) <= topCutNumber) {
            calcTopCut += p3
            setP3(p3.toString())
            console.log('p3')
            if ((calcTopCut + p4) <= topCutNumber) {
              calcTopCut += p4
              setP4(p4.toString())
              console.log('p4')
              if ((calcTopCut + p5) <= topCutNumber) {
                calcTopCut += p5
                setP5(p5.toString())
                console.log('p5')
              } else {
                const valDiff = (topCutNumber - calcTopCut).toString()
                setCutOff(valDiff)
                console.log('p5 finish')
              }
            } else {
              const valDiff = (topCutNumber - calcTopCut).toString()
              setCutOff(valDiff)
              console.log('p4 finish')
            }
          } else {
            const valDiff = (topCutNumber - calcTopCut).toString()
            setCutOff(valDiff)
            console.log('p3 finish')
          }
        } else {
          const valDiff = (topCutNumber - calcTopCut).toString()
          setCutOff(valDiff)
          console.log('p2 finish')
        }
      }
    }

    console.log(p0)
    console.log(p1)
    console.log(p2)
    console.log(p3)
    console.log(p4)
    console.log(p5)
    console.log(p6)
    console.log(p7)
    console.log(p8)

  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <View style={{ flex: 1, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center',  }}>
              <Text style={{ marginRight: 10 }}>
                Players
              </Text>
            </View>
            <TextInput
              onChangeText={setNumberOfPlayers}
              value={numberOfPlayers}
              placeholder=' Number of players'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 20, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center',  }}>
              <Text style={{ marginRight: 10 }}>
                Rounds
              </Text>
            </View>
            <TextInput
              onChangeText={setNumberOfRounds}
              value={numberOfRounds}
              placeholder=' Number of rounds'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, width: Dimensions.get('window').width}}>
            <View style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center',  }}>
              <Text style={{ marginRight: 10 }}>
                Top Cut
              </Text>
            </View>
            <TextInput
              onChangeText={setEventTopCut}
              value={eventTopCut}              
              placeholder=' Top cut for the event'
              placeholderTextColor='grey'
              style={{ height: 40, flex: 1, borderWidth: 1 }}
              keyboardType='number-pad'
            />
          </View>

          <View style={{ flex: 1, paddingTop: 20 }}>
            <Pressable 
              style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }} 
              onPress={() => {
                calculateTopCut(numberOfPlayers, numberOfRounds, eventTopCut)
              }} 
            >
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                Calculate
              </Text>
            </Pressable>
          </View>

        </View>
        
        <View style={{ flex: 1, backgroundColor: 'red' }}>

          { p0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p0}
              </Text>
            </View>
          )}
          
          { p1 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p1}
              </Text>
            </View>
          )}

          { p2 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p2}
              </Text>
            </View>
          )}

          { p3 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p3}
              </Text>
            </View>
          )}

          { p4 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p4}
              </Text>
            </View>
          )}

          { p5 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {p5}
              </Text>
            </View>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
              {cutOff}
            </Text>
          </View>

        </View>
      

    </SafeAreaView>
  );
}

export default Calculator