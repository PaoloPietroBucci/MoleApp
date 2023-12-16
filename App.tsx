import LogInScreen from './components/LogInScreen';
import SignInScreen from './components/SignInScreen';
import Menu from './components/Menu';
import {navigationRef} from './components/RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import {useContext, useReducer, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';


  
const Stack = createStackNavigator();
const [isLoggedIn, setIsLoggedIn] = useState()

function App(): JSX.Element {
  return(
    <NavigationContainer>
  {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogInScreen} initialParams={{ isLoggedIn, setIsLoggedIn }}></Stack.Screen>
          <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        </Stack.Navigator>) :(
        <HomeScreen></HomeScreen>)
  }
</NavigationContainer>
  )
}

export default App;
