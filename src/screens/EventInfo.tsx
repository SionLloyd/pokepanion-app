import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

const EventInfo = ({ navigation, route }) => {

  const { eventId, eventTips } = route.params

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red', alignItems: 'center' }}>
      <Pressable 
        onPress={deleteAlert}
        style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 40, backgroundColor: 'white', position: 'absolute', bottom: 20 }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Delete Event
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default EventInfo