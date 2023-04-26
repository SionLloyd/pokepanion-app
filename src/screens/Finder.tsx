import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  SectionList,
  Text,
  TextInput,
  View,
} from 'react-native';
import { format, parseISO, parse } from 'date-fns'

type event = {
  _id: number,
  name: string,
  date: string,
  type: string
}

const Finder = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true)
  const [sortedEvents, setSortedEvents] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const getEvents = async () => {
      await getAllEvents()
    }
    getEvents()
  }, [])

  const getAllEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events/')
      const json = await response.json()
      await sortAllEvents(json).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const sortAllEvents = async (events: any) => {
    let eventsArr = []
    events.forEach(event => {
      const eventISO = parseISO(event.date)
      const eventMonth = format(eventISO, 'MMMM')
      if (eventsArr.length === 0) {
        eventsArr.push({title: eventMonth, key: eventMonth, data: [event]})
        return
      } else {
        let added = false
        eventsArr.forEach(groupedEvents => {
          if (groupedEvents.title === eventMonth) {
            groupedEvents.data.push(event)
            added = true
          }
        })
        if (!added) {
          eventsArr.push({title: eventMonth, key: eventMonth, data: [event]})
        }
      }
    })
    setSortedEvents(eventsArr)
  }

  const AddEvent = () => {
    const [eventName, setEventName] = React.useState('');
    const [eventType, setEventType] = React.useState('');
    const [eventDate, setEventDate] = React.useState('');

    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <View style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, margin: 10, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}> 
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, padding: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                  Add an event
                </Text>
                <Pressable style={{ height: 30, width: 40, justifyContent: 'center' }} onPress={() => setModalVisible(!modalVisible)}>
                  <Text>
                    Close
                  </Text>
                </Pressable>
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Name
                </Text>
                <TextInput
                  onChangeText={setEventName}
                  placeholder='Store or venue name'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventName}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Type
                </Text>
                <TextInput
                  onChangeText={setEventType}
                  placeholder='Challenge? Cup? Regional?'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventType}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Date
                </Text>
                <TextInput
                  onChangeText={setEventDate}
                  placeholder='FIX ME'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventDate}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10 }}>
                <Pressable 
                  style={{ height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan', borderRadius: 20 }} 
                  onPress={() => {
                    addRequest(eventName, eventType, eventDate)
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text>
                    Submit
                  </Text>
                </Pressable>
              </View>
              
              
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    )
  }

  const addRequest = (eventName: string, eventType: string, eventDate: string) => {
    async function addPost() {
      try {
        await fetch(
          'http://localhost:8000/api/events/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: eventName, type: eventType, date: eventDate})
          }
        ).then(res => console.log(res)).catch(err => console.log(err))
        console.log('addPost')
      } catch (error) {
        console.error(error)
      }
    }

    addPost()
  }

  const renderItem = ({item}) => {
    const image = item.type === 'Cup' ? 'https://img.icons8.com/color/512/superball.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Poké_Ball_icon.svg/1200px-Poké_Ball_icon.svg.png'
    const eventISO = parseISO(item.date)
    const eventMonth = format(eventISO, 'dd-MM-yyyy')

    return (
      <Pressable 
        style={{backgroundColor: '#f9c2ff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 8}}
        onPress={() => navigation.navigate('EventInfo', { eventId: item._id })}
      >
        <Text style={{fontSize: 12}}>{eventMonth}</Text>
        <Text style={{fontSize: 12}}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.type}</Text>
        <Image
          style={{height: 50, width: 50}}
          resizeMode='contain'
          source={{ uri: image }}
        />
      </Pressable>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ borderWidth: 1, height: 40, alignItems: 'center', borderRadius: 20, paddingLeft: 10, flexDirection: 'row', marginHorizontal: 10 }}>
        <Text>
          Filter:
        </Text>
        <Pressable style={{ borderWidth: 1, borderRadius: 20, marginLeft: 10, padding: 10 }}>
          <Text>
            By: All
          </Text>
        </Pressable>
      </View>

      {isLoading ? (
        <ActivityIndicator
          animating
          color={'red'}
        />
      ) : (
        <SectionList
          sections={sortedEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => renderItem(item)}
          renderSectionHeader={({ section }) => (
            <>
              <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 8 }}>
                <Text style={{fontSize: 32, fontWeight: 'bold', backgroundColor: '#fff'}}>{section.title}</Text>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode='contain'
                  source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/586/732/original/calendar-icon-a-red-calendar-for-reminders-of-appointments-and-important-festivals-in-the-year-png.png'}}
                />
              </View>
            </>
          )}
        />
      )}

      <AddEvent/>
      
      <Pressable onPress={() => setModalVisible(true)} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Add an event
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Finder