import * as React from 'react'
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {name as appName} from './app.json';

import Builder from './src/screens/Builder'
import Calculator from './src/screens/Calculator'
import EventInfo from './src/screens/EventInfo'
import Finder from './src/screens/Finder'
import GameScreen from './src/screens/GameScreen'
import Home from './src/screens/Home'
import Pairings from './src/screens/Pairings'
import Profile from './src/screens/Profile'
import Settings from './src/screens/Settings'
import Social from './src/screens/Social'
import Tournament from './src/screens/Tournament'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="Builder"
          component={Builder}
          options={{title: 'Builder'}}
        />
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{title: 'Calculator'}}
        />
        <Stack.Screen
          name="Finder"
          component={Finder}
          options={{title: 'Finder'}}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{title: 'Game'}}
        />
        <Stack.Screen
          name="Pairings"
          component={Pairings}
          options={{title: 'Pairings'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="Social"
          component={Social}
          options={{title: 'Social'}}
        />
        <Stack.Screen
          name="Tournament"
          component={Tournament}
          options={{title: 'Tournament'}}
        />
        <Stack.Screen
          name="EventInfo"
          component={EventInfo}
          options={{title: 'Information'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;