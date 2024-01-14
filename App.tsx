import LogInScreen from './components/LogInScreen';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Menu from './components/Menu';
import {getUser} from './firebase/userApi';
import User from './model/User';
import SignInScreen from './components/SignInScreen';
import {SplashScreen} from './components/SplashScreen';

interface AuthContextData {
  user: User | undefined;
  setUser: any;
}
export const authContext = createContext<AuthContextData>({
  user: undefined,
  setUser: null,
});

function App(): JSX.Element {
  const Stack = createStackNavigator();
  const [user, setUser] = useState<User>();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const bootApp = async () => {
      const subscriber = auth().onAuthStateChanged(authStateChangedAction);
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return subscriber;
    };
    bootApp();
  }, []);

  async function authStateChangedAction(firebaseUser: any) {
    console.log(firebaseUser);
    if (firebaseUser) {
      try {
        const myUser = await getUser(firebaseUser.email);
        if (myUser !== undefined) {
          setUser(myUser);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
  if (showSplash) {
    return <SplashScreen></SplashScreen>;
  } else {
    return (
      <authContext.Provider value={{user: user, setUser: setUser}}>
        <NavigationContainer>
          {user === undefined ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="LogIn" component={LogInScreen}></Stack.Screen>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}></Stack.Screen>
            </Stack.Navigator>
          ) : (
            <Menu></Menu>
          )}
        </NavigationContainer>
      </authContext.Provider>
    );
  }
}

export default App;
