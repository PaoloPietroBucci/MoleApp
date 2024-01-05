import LogInScreen from './components/LogInScreen';
import SignInScreen from './components/SignInScreen';
import ProfileScreen from './components/ProfileScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Menu from './components/Menu';
import {getUser} from './firebase/userApi';
import User from './model/User';

export const authContext = createContext<any>({});

function App(): JSX.Element {


  const Stack = createStackNavigator();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.trace('starting', user);
    const subscriber = auth().onAuthStateChanged(authStateChangedAction);
    return subscriber; // unsubscribe on unmount
  }, []);

  function authStateChangedAction(firebaseUser:any) {
    console.trace('changed', firebaseUser);
    if (firebaseUser !== null) {
      getUser(firebaseUser.uid).then( (response) =>{
        console.debug(response)
        setUser(response)
      }
      )
    }
  }

  return (
    <NavigationContainer>
      {user == undefined ? (
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogInScreen}></Stack.Screen>
          <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <authContext.Provider value={{user: user, setUser: setUser}}>
          <Menu></Menu>
        </authContext.Provider>
      )}
    </NavigationContainer>
  );
}

export default App;
