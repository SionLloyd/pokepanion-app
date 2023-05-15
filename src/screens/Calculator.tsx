import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
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
  const [cutOffRecord, setCutOffRecord] = useState('')
  const [revealStats, setRevealStats] = useState(false)
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
                setP5(p5.toString())
                setCutOff(valDiff)
                setCutOffRecord(`${Number(numberOfRounds) - 5}-5`)
                console.log('p5 finish')
                return
              }
            } else {
              const valDiff = (topCutNumber - calcTopCut).toString()
              setP4(p4.toString())
              setCutOff(valDiff)
              setCutOffRecord(`${Number(numberOfRounds) - 4}-4`)
              console.log('p4 finish')
              return
            }
          } else {
            const valDiff = (topCutNumber - calcTopCut).toString()
            setP3(p3.toString())
            setCutOff(valDiff)
            setCutOffRecord(`${Number(numberOfRounds) - 3}-3`)
            console.log('p3 finish')
            return
          }
        } else {
          const valDiff = (topCutNumber - calcTopCut).toString()
          setP2(p2.toString())
          setCutOff(valDiff)
          setCutOffRecord(`${Number(numberOfRounds) - 2}-2`)
          console.log('p2 finish')
          return
        }
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      
      <View style={{ paddingVertical: 10 }}>
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

          <View style={{ paddingTop: 20 }}>
            <Pressable 
              style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }} 
              onPress={() => {
                Keyboard.dismiss()
                setRevealStats(true)
                calculateTopCut(numberOfPlayers, numberOfRounds, eventTopCut)
              }} 
            >
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                Calculate
              </Text>
            </Pressable>
          </View>

        </View>
        
        {revealStats && (
          <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                Based on {numberOfPlayers} players,{'\n'} {numberOfRounds} rounds of swiss,{'\n'} top cut of {eventTopCut}
              </Text>
            </View>

            { p0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {numberOfRounds}-0 - {Math.round(Number(p0) * 10) / 10}
                </Text>
              </View>
            )}

            { p1 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {Number(numberOfRounds) - 1}-1 - {Math.round(Number(p1) * 10) / 10}
                </Text>
              </View>
            )}

            { p2 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {Number(numberOfRounds) - 2}-2 - {Math.round(Number(p2) * 10) / 10}
                </Text>
              </View>
            )}

            { p3 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {Number(numberOfRounds) - 3}-3 - {Math.round(Number(p3) * 10) / 10}
                </Text>
              </View>
            )}

            { p4 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {Number(numberOfRounds) - 4}-4 - {Math.round(Number(p4) * 10) / 10}
                </Text>
              </View>
            )}

            { p5 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, width: Dimensions.get('window').width}}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                  {Number(numberOfRounds) - 5}-5 - {Math.round(Number(p5) * 10) / 10}
                </Text>
              </View>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingTop: 20, width: Dimensions.get('window').width}}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', textDecorationLine: 'underline' }}>
                Cut off
              </Text>
              <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                {Math.round(Number(cutOff) * 10) / 10} players @ {cutOffRecord} will make top cut
              </Text>
              <Text style={{ fontSize: 30, textAlign: 'center', }}>
                *All better records should be safe*
              </Text>
            </View>

            </View>
        )}

    </SafeAreaView>
  );
}

export default Calculator