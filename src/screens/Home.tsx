import React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native'

const Home = ({ navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground style={{ flex: 1 }} resizeMode={'stretch'} source={{ uri: 'https://w.forfun.com/fetch/8d/8d8ea5c4a071b5856107fa35dfebeb89.jpeg'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>

        <View style={{ position: 'absolute', backgroundColor: 'white', top: 20, height: 120, width: Dimensions.get('window').width / 1.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 2, borderColor: 'black' }}>
          <Text style={{ fontSize: 50, fontWeight: 'bold' }}>
            Pokepanion
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('GameScreen')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                source={{ uri: 'https://leekduck.com/assets/img/icons/BattleIconColor.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Battle
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Finder')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                source={{ uri: 'https://img.icons8.com/color/512/map-pokemon.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Finder
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Pairings')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                resizeMode='contain'
                source={{ uri: 'https://www.shareicon.net/data/2016/08/05/807302_gaming_512x512.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Pairings
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Social')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                resizeMode='contain'
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/330/330703.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Social
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100,   alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Tournament')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                resizeMode='contain'
                source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4917dfa1-7696-4124-a1af-f85d0a5ee5af/dcf1jru-305b47aa-4607-43f4-a698-e108c12d3384.png/v1/fill/w_500,h_380,strp/pokemontrophy_by_dragonith_dcf1jru-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzgwIiwicGF0aCI6IlwvZlwvNDkxN2RmYTEtNzY5Ni00MTI0LWExYWYtZjg1ZDBhNWVlNWFmXC9kY2YxanJ1LTMwNWI0N2FhLTQ2MDctNDNmNC1hNjk4LWUxMDhjMTJkMzM4NC5wbmciLCJ3aWR0aCI6Ijw9NTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.4Y9MgaoQVJZfkAd6-999u0gIBc7gL6tpElQNb0Sygr8'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Tournament
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100,   alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Calculator')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                resizeMode='contain'
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Circle-icons-calculator.svg/1200px-Circle-icons-calculator.svg.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Calculator
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Profile')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                source={{ uri: 'https://icon-library.com/images/pokemon-trainer-icon/pokemon-trainer-icon-4.jpg'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Profile
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Builder')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                source={{ uri: 'https://cdn3.iconfinder.com/data/icons/card-games-colored/48/Games_CardGames_Artboard_23-512.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Builder
              </Text>
            </Pressable>
            <Pressable style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => {navigation.navigate('Settings')}}>
              <Image
                style={{height: 50, width: 50, backgroundColor: 'white', borderRadius: 10}}
                source={{ uri: 'https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_Settings-512.png'}}
              />
              <Text style={{ color: 'white', paddingTop: 5 }}>
                Settings
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ position: 'absolute', backgroundColor: 'white', bottom: 20, height: 40, width: Dimensions.get('window').width / 1.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 2, borderColor: 'black' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Version 1.0
          </Text>
        </View>

        </View>
      </ImageBackground>
    </View>
  );
}

export default Home