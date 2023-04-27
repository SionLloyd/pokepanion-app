import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

const EVENTDATA = [
  {'title': 'Where', 'data': 'Portsmouth, Somerstown community centre'},
  {'title': 'When', 'data': 'Saturday, May 20th, 2023 at 10:00:00 AM GMT+01:00'},
  {'title': 'Event type', 'data': 'League Cup'},
  {'title': 'Rewards', 'data': 'Packs, League cup promo and playmat for the winner of each division'},
  {'title': 'Cost', 'data': '£20'}
];

const TRAINERTIPSDATA = [
  {'title': 'Parking', 'data': 'Unnamed Road, Southsea, Portsmouth, Southsea PO1 2DJ'}
];

const EventInfo = ({ navigation, route }) => {

  const { eventId, eventTips } = route.params

  const [modalVisible, setModalVisible] = useState(false)

  const addTrainerTip = () => {
    async function addTip() {
      try {
        await fetch(
          'http://localhost:8000/api/events/add/tip', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: eventId, tip: eventTips})
          }
        ).then(res => console.log(res)).catch(err => console.log(err))
        console.log('addTip')
      } catch (error) {
        console.error(error)
      }
    }

    addTip()
  }

  const AddTrainerTipModal = () => {

    const [tipType, setTipType] = React.useState('');
    const [tipData, setTipData] = React.useState('');

    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <View style={{ height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, margin: 10, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}> 
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, padding: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                  New trainer tip
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
                  Tip type
                </Text>
                <TextInput
                  onChangeText={setTipType}
                  placeholder=' Parking? Train station distance?'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={tipType}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, padding: 10, }}>
                <Text>
                  Tip information
                </Text>
                <TextInput
                  onChangeText={setTipData}
                  placeholder=' Parking address? The time to walk from station?'
                  placeholderTextColor='grey'
                  style={{ height: 40, borderWidth: 1 }}
                  value={tipData}
                />
              </View>


            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    )
  }

  const deleteAlert = () => {
    return (
      Alert.alert(
        'Are you sure you want to delete this event?',
        'Deleting this event will remove it from the events list',
        [
          {
            text: 'OK',
            onPress: () => {
              deleteEvent()
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      )
    )
  }

  const deleteEvent = () => {
    async function deletePost() {
      try {
        console.log(eventId)
        await fetch(
          'http://localhost:8000/api/events/delete/id', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: eventId})
          }
        ).then(res => console.log(res)).catch(err => console.log(err))
        console.log('deleteEvent')
      } catch (error) {
        console.error(error)
      }
    }

    deletePost()
  }

  const RenderEventInfo = ({item}) => {
    return (
      <View style={{ padding: 10, justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
          {item.title}
        </Text>
        <Text style={{ color: 'black' }}>
          {item.data}
        </Text>
      </View>
    )
  }

  const RenderTrainerTips = ({item}) => {
    return (
      <View style={{ padding: 10, justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
          {item.title}
        </Text>
        <Text style={{ color: 'black' }}>
          {item.data}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '', alignItems: 'center' }}>
      <ScrollView style={{ flex: 1, borderStartColor: 'green' }}>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Event Information
          </Text>
        </View>
        

        <FlatList
          data={EVENTDATA}
          renderItem={(item) => RenderEventInfo(item)}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Trainer Tips
          </Text>
        </View>

        <FlatList
          data={TRAINERTIPSDATA}
          renderItem={(item) => RenderTrainerTips(item)}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={{ marginTop: 10, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}>
          <Pressable 
            onPress={() => setModalVisible(true)}
            style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 40, backgroundColor: '', }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Add trainer tip
            </Text>
          </Pressable>
        </View>
        

        <AddTrainerTipModal/>
      
      </ScrollView>

      <View style={{ marginHorizontal: 10, borderRadius: 20, borderWidth: 2, borderColor: 'black' }}>
        <Pressable 
          onPress={deleteAlert}
          style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 40, backgroundColor: '', }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Delete Event
          </Text>
        </Pressable>
      </View>

      
    </SafeAreaView>
  );
}

export default EventInfo