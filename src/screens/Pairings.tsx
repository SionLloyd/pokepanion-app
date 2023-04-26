import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from 'react-native';

// Fake data
const DATA = [
  { title: 'May',
    key: 'may',
    data: [
      {name: 'Swansea League Challenge', type: 'Challenge', date: '01/05/2023', id: 1111},
      {name: 'Cardiff League Cup', type: 'Cup', date: '03/05/2023', id: 1112},
      {name: 'Portsmouth League Challenge', type: 'Challenge', date: '05/05/2023', id: 1113},
      {name: 'Portsmouth League Cup', type: 'Cup', date: '06/05/2023', id: 1114},
      {name: 'Bexhill League Challenge', type: 'Challenge', date: '20/05/2023', id: 1115},
      {name: 'Brighton League Cup', type: 'Cup', date: '24/05/2023', id: 1116}
    ]
  },
  { title: 'June',
    key: 'june',
    data: [
      {name: 'London League Challenge', type: 'Challenge', date: '04/05/2023', id: 1117},
      {name: 'Brighton League Cup', type: 'Cup', date: '07/05/2023', id: 1118},
      {name: 'Manchester League Challenge', type: 'Challenge', date: '19/05/2023', id: 1119},
      {name: 'Liverpool League Cup', type: 'Cup', date: '20/05/2023', id: 1120},
      {name: 'Ammanford League Challenge', type: 'Challenge', date: '23/05/2023', id: 1121},
      {name: 'Harrogate League Cup', type: 'Cup', date: '28/05/2023', id: 1122}
    ]
  },
  { title: 'July',
    key: 'july',
    data: [
      {name: 'Bristol League Challenge', type: 'Challenge', date: '01/05/2023', id: 1123},
      {name: 'Bristol League Cup', type: 'Cup', date: '02/05/2023', id: 1124},
      {name: 'Llanelli League Challenge', type: 'Challenge', date: '06/05/2023', id: 1125},
      {name: 'Carmarthen League Cup', type: 'Cup', date: '14/05/2023', id: 1126},
      {name: 'Shrewsbury League Challenge', type: 'Challenge', date: '19/05/2023', id: 1127},
      {name: 'Leeds League Cup', type: 'Cup', date: '27/05/2023', id: 1128}
    ]
  }
]

const Pairings = ({ navigation }) => {

  

  const renderItem = ({item}) => {
    const image = item.type === 'Cup' ? 'https://img.icons8.com/color/512/superball.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Poké_Ball_icon.svg/1200px-Poké_Ball_icon.svg.png'
    return (
      <Pressable 
        style={{backgroundColor: '#f9c2ff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 8}}
        onPress={() => navigation.navigate('EventInfo')}
      >
        <Text style={{fontSize: 12}}>{item.date}</Text>
        <Text style={{fontSize: 12}}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.type}</Text>
        <Image
          style={{height: 50, width: 50}}
          resizeMode='contain'
          source={{ uri: image}}
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
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => renderItem(item)}
        renderSectionHeader={({section: {title}}) => (
          <>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 8 }}>
              <Text style={{fontSize: 32, fontWeight: 'bold', backgroundColor: '#fff'}}>{title}</Text>
              <Image
                style={{height: 50, width: 50}}
                resizeMode='contain'
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/586/732/original/calendar-icon-a-red-calendar-for-reminders-of-appointments-and-important-festivals-in-the-year-png.png'}}
              />
            </View>
          </>
        )}
      />
      <Pressable style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 40, }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Add an event
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Pairings