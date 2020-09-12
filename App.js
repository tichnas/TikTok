import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DiscoverScreen from './screens/Discover';
import FavouritesScreen from './screens/Favourites';
import VideoItem from './components/VideoItem';
import favouritesReducer from './store/reducers/favourites';

const rootReducer = combineReducers({ favourites: favouritesReducer });
const store = createStore(rootReducer);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FullScreenVideo = ({ route, navigation }) => (
  <VideoItem fullScreen video={route.params.video} navigation={navigation} />
);

const MainNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => (
        <Icon
          name={route.name === 'Discover' ? 'search' : 'favorite'}
          size={size}
          color={
            !focused ? 'grey' : route.name === 'Discover' ? 'dodgerblue' : 'red'
          }
        />
      ),
      tabBarLabel: ({ focused }) => (
        <Text
          style={{
            color: !focused
              ? 'grey'
              : route.name === 'Discover'
              ? 'dodgerblue'
              : 'red',
            marginLeft: 11
          }}>
          {route.name}
        </Text>
      )
    })}>
    <Tab.Screen name='Discover' component={DiscoverScreen} />
    <Tab.Screen name='Favourites' component={FavouritesScreen} />
  </Tab.Navigator>
);

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='main'
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='video'
          component={FullScreenVideo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
