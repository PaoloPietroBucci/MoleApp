import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TeamsScreen from './TeamsScreen';
import StandingScreen from './StandingsScreen';
import NewsScreen from './NewsScreen';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome User!</Text>
    </View>
  );
}

const Menu = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => <Icon name="user-alt" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Teams"
          component={TeamsScreen}
          options={{
            tabBarIcon: () => <Icon1 name="group" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Icon name="home" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Standings"
          component={StandingScreen}
          options={{
            tabBarIcon: () => <Icon name="list-ol" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarIcon: () => <Icon name="newspaper" color="black" size={26} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Menu;
