import React from 'react';
import {View, Text} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import FontIcon1 from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TeamsScreen from './TeamsScreen';
import StandingScreen from './StandingsScreen';
import NewsScreen from './NewsScreen';
import LogInScreen from './LogInScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const Menu = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        labeled={false}
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => <FontIcon name="user-alt" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            tabBarIcon: () => <AntIcon name="login" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Teams"
          component={TeamsScreen}
          options={{
            tabBarIcon: () => <FontIcon1 name="group" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <FontIcon name="home" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="Standings"
          component={StandingScreen}
          options={{
            tabBarIcon: () => <FontIcon name="list-ol" color="black" size={30} />,
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            tabBarIcon: () => <FontIcon name="newspaper" color="black" size={26} />,
          }}
        />
      </Tab.Navigator>
  );
};

export default Menu;
