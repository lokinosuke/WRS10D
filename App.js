// app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesScreen from './MoviesScreen';
import DetailsScreen from './DetailsScreen';
import FavoriteScreen from './FavoriteScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Recherche"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;
