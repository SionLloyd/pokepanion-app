import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import auth from '@react-native-firebase/auth'
import { format, parseISO } from 'date-fns'

const Finder = ({ navigation }) => {

  const [userInfo, setUserInfo] = useState(Object)

  const [index, setIndex] = React.useState(0);
  const [isLoading, setLoading] = useState(true)
  const [sortedEvents, setSortedEvents] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const FirstRoute = () => (
    <SafeAreaView style={{ flex: 1 }}>
      {!userInfo.email ? (
        <View style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Please sign in to use this feature..
          </Text>
          <View style={{padding: 50}}>
            <Image
              style={{height: 200, width: 200}}
              resizeMode='contain'
              source={{uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c3689ad-a9b3-42dc-a6a5-b06cff478ffb/d51atac-fd55b989-2757-4c68-af44-a6b2cceb6623.png/v1/fill/w_583,h_350/latios_use_computer_remake_by_redeyelatios_d51atac-350t.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzYwIiwicGF0aCI6IlwvZlwvMmMzNjg5YWQtYTliMy00MmRjLWE2YTUtYjA2Y2ZmNDc4ZmZiXC9kNTFhdGFjLWZkNTViOTg5LTI3NTctNGM2OC1hZjQ0LWE2YjJjY2ViNjYyMy5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.zD_HGL6QKpMfDG7uAYvQyeia5ybVgGfi4fVXtuMh6Gg'}}
            />
          </View>
        </View>
      ) : (
        <>
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
              <SectionList
                sections={sortedEvents}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => (
                  <View style={{ height: 50 }}/>
                )}
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
              
              <AddEvent/>
          
              <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 10 }}>
                <Pressable onPress={() => setModalVisible(true)} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', borderRadius: 20, marginHorizontal: 10 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Add an event
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </>
      )}

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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
  }, [])

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserInfo(user)
      getAllEvents()
    } else {
      console.log('nope')
      setUserInfo(false)
    }
  }

  const getAllEvents = () => {
    async function getEvents() {
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
    
    getEvents()
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
    const [eventName, setEventName] = React.useState('')
    const [eventType, setEventType] = React.useState('')
    const [eventDate, setEventDate] = React.useState('')
    const [eventLocation, setEventLocation] = React.useState('');
    const [eventRewards, setEventRewards] = React.useState('');
    const [eventCost, setEventCost] = React.useState('');

    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{ backgroundColor: 'white' }}> 
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

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Location
                </Text>
                <TextInput
                  onChangeText={setEventLocation}
                  placeholder=' Store or venue name'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventLocation}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Rewards
                </Text>
                <TextInput
                  onChangeText={setEventRewards}
                  placeholder=' Prize packs? Playmat?'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventRewards}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Cost
                </Text>
                <TextInput
                  onChangeText={setEventCost}
                  placeholder=' £££'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={eventCost}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10 }}>
                <Pressable 
                  style={{ height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'cyan', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }} 
                  onPress={() => {
                    addRequest(eventName, eventType, eventDate, eventLocation, eventRewards, eventCost)
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>
                    Submit
                  </Text>
                </Pressable>
              </View>
              
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    )
  }

  const addRequest = (eventName: string, eventType: string, eventDate: string, eventLocation: string, eventRewards: string, eventCost: string) => {
    async function addPost() {
      try {
        await fetch(
          'http://localhost:8000/api/events/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: eventName, type: eventType, date: eventDate, location: eventLocation, rewards: eventRewards, cost: eventCost, submittedBy: userInfo.email})
          }
        ).then(res => res.json())
        .then(res => getAllEvents)
        .catch(err => console.log(err))
        console.log('getTips')
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
        onPress={() => navigation.navigate('EventInfo', { event: item })}
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