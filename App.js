// app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import MoviesScreen from './MoviesScreen';
import DetailsScreen from './DetailsScreen';
import FavoriteScreen from './FavoriteScreen';
import SearchScreen from './SearchScreen';
import ProfilScreen from './ProfilScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          headerStyle: { backgroundColor: 'rgb(0, 0, 0)' }, // Set background color of the top navigation bar
          headerTintColor: '#fff', // Set text color of the top navigation bar
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={({ navigation }) => ({
    headerTransparent: true,
    headerTitle: '',
    headerBackTitleVisible: false,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 15 }} // Add padding to the left of the TouchableOpacity
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Low opacity black background
            padding: 10, // Add padding to the icon
            borderRadius: 25, // Optional: Add border radius for rounded corners
          }}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </View>
      </TouchableOpacity>
    ),
  })}
/>

    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen}
      options={{
          headerStyle: { backgroundColor: 'rgb(0, 0, 0)' }, // Set background color of the top navigation bar
          headerTintColor: '#fff', // Set text color of the top navigation bar
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={({ navigation }) => ({
    headerTransparent: true,
    headerTitle: '',
    headerBackTitleVisible: false,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 15 }} // Add padding to the left of the TouchableOpacity
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Low opacity black background
            padding: 10, // Add padding to the icon
            borderRadius: 25, // Optional: Add border radius for rounded corners
          }}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </View>
      </TouchableOpacity>
    ),
  })}
/>
          </Stack.Navigator>
  );
}

function App() {
  return (
<NavigationContainer>
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { 
        backgroundColor: 'rgb(68 84 102)',
        paddingVertical: 8,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={({ route }) => ({
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="copy-outline"
            color={focused ? 'rgb(65 188 244)' : 'rgb(170 187 204)'}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Recherche"
      component={SearchStack}
      options={({ route }) => ({
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="search"
            color={focused ? 'rgb(65 188 244)' : 'rgb(170 187 204)'}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Watchlist"
      component={FavoriteScreen}
      options={({ route }) => ({
        tabBarLabel: '',
        headerStyle: { backgroundColor: 'rgb(0 0 0)' },
        headerTintColor: '#fff',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name="heart"
            color={focused ? 'rgb(65 188 244)' : 'rgb(170 187 204)'}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
    name="Profil"
    component={ProfilScreen}
    options={({ route }) => ({
      tabBarLabel: '',
      headerStyle: { backgroundColor: 'rgb(0 0 0)' },
      headerTintColor: '#fff',
      tabBarIcon: ({ color, size, focused }) => (
        <Ionicons
          name="person"
          color={focused ? 'rgb(65 188 244)' : 'rgb(170 187 204)'}
          size={size}
        />
      ),
    })}
  />
  </Tab.Navigator>
</NavigationContainer>



  );
}

export default App;
