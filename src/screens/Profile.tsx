import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const Profile = ({ navigation }) => {

  const [loggedIn, setloggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '278590676973-e6imn19qgrem0h6dg3fji3hhg72d7cs1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const onAuthStateChanged = (user) => {
    setUserInfo(user)
    console.log(user)
    if (user) setloggedIn(true)
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const {accessToken, idToken} = await GoogleSignin.signIn()
      console.log('here', idToken)
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      )
      console.log('here', credential)
      await auth().signInWithCredential(credential)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress')
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE')
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      auth()
        .signOut()
        .then(() => Alert.alert('Your are signed out!'))
      setloggedIn(false)
      setUserInfo({})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center' }}>
      {loggedIn && (
        <View>

          <View style={{ alignItems: 'center', paddingTop: 20 }}>
            <Image
              source={{uri: `${userInfo.photoURL}`}}
              style={{ height: 125, width: 125, borderRadius: 30 }}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width / 1.2, paddingTop: 20 }}>
            <View style={{ flex: 1, alignItems: 'center', paddingRight: 10 }}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 20, color: 'grey', padding: 5 }}>
                Followers
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                0
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'black', paddingHorizontal: 10 }}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 20, color: 'grey', padding: 5 }}>
                Following
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                0
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 10 }}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 20, color: 'grey', padding: 5 }}>
                Tournaments
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                0
              </Text>
            </View>

          </View>

          <View style={{ marginTop: 30, borderWidth: 2, borderColor: 'black' }}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 16, color: 'grey', padding: 5 }}>
              Recent Events:
            </Text>
            <View style={{ paddingTop: 20, alignItems: 'center' }}>
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
            </View>
          </View>
          
        </View>
      )}
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
        {loggedIn ? (
          <View style={{ width: 192, height: 48, justifyContent: 'center', borderWidth: 1, borderColor: 'grey' }}>
            <Button
              onPress={signOut}
              title="Log Out"
              color="grey"/>
          </View>
        ) : (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        )}
      </View>
    </View>
  )
}

export default Profile