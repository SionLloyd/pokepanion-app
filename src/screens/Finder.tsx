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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { format, parseISO } from 'date-fns'

type event = {
  _id: number,
  name: string,
  date: string,
  type: string
}

const Finder = ({ navigation }) => {

  const [index, setIndex] = React.useState(0);
  const [isLoading, setLoading] = useState(true)
  const [sortedEvents, setSortedEvents] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const FirstRoute = () => (
    <SafeAreaView style={{ flex: 1, }}>
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
              <View style={{ backgroundColor: '#F2F2F2', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 8 }}>
                <Text style={{fontSize: 32, fontWeight: 'bold' }}>{section.title}</Text>
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
      
      <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 10}}>
        <Pressable onPress={() => setModalVisible(true)} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Add an event
          </Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );

  const SecondRoute = () => (
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

  const renderScene = SceneMap({
    list: FirstRoute,
    calendar: SecondRoute,
  });

  const [routes] = React.useState([
    { key: 'list', title: 'List' },
    { key: 'calendar', title: 'Calendar' },
  ]);

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
                  New event
                </Text>
                <Pressable style={{ height: 30, width: 30, justifyContent: 'center' }} onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={{height: 30, width: 30}}
                    resizeMode='contain'
                    source={{ uri: 'https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png' }}
                  />
                </Pressable>
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Name
                </Text>
                <TextInput
                  onChangeText={setEventName}
                  placeholder=' Store or venue name'
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
                  placeholder=' Challenge? Cup? Regional?'
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
                  placeholder=' FIX ME'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventDate}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10 }}>
                <Pressable 
                  style={{ height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }} 
                  onPress={() => {
                    addRequest(eventName, eventType, eventDate)
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>
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
    const eventMonth = format(eventISO, 'PPPPpppp')

    return (
      <Pressable 
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 5, marginBottom: 5 }}
        onPress={() => navigation.navigate('EventInfo', { eventId: item._id, eventTips: item.tips })}
      >
        <View style={{ flex: 1, backgroundColor: '', padding: 10, paddingBottom: 5 }}>
          <Text style={{ fontSize: 12, paddingBottom: 5 }}>{eventMonth}</Text>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 3, borderRadius: 10 }}>
            <Image
              style={{height: 50, width: 50}}
              resizeMode='contain'
              source={{ uri: image }}
            />
            <View style={{ paddingLeft: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize: 12}}>{item.type}</Text>
            </View>
          </View>
        </View>
        
      </Pressable>
    )
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <View>
            {route.title === 'List' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 30, width: 30}}
                  resizeMode='contain'
                  source={{uri: 'https://icons.veryicon.com/png/o/application/immwa2016/list-11.png'}}
                />
                <Text style={{ color: 'black', paddingLeft: 5 }}>
                  {route.title}
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 30, width: 30}}
                  resizeMode='contain'
                  source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Calendar_icon_2.svg/1978px-Calendar_icon_2.svg.png'}}
                />
                <Text style={{ color: 'black', paddingLeft: 5 }}>
                  {route.title}
                </Text>
              </View>
            )}
        </View>
      )}
      indicatorStyle={{ backgroundColor: 'grey' }}
      style={{ backgroundColor: 'white' }}
    />
  )

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  )
}

export default Finder