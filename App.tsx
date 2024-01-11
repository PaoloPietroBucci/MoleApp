import LogInScreen from './components/LogInScreen';

import ProfileScreen from './components/ProfileScreen';
import storage from '@react-native-firebase/storage';
import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Menu from './components/Menu';
import {addUser, getUser} from './firebase/userApi';
import User from './model/User';
import SignInScreen from './components/SignInScreen';

interface AuthContextData {
  user: User | undefined;
  setUser: any;
  mainLogo: string | undefined;
}
export const authContext = createContext<AuthContextData>({
  user: undefined,
  setUser: null,
  mainLogo: undefined,
});

function App(): JSX.Element {
  const mainLogoRef = 'loghi/Mole-Cup_Magenta.png';
  const [url, SetUrl] = useState<string>();
  const Stack = createStackNavigator();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootApp = async () => {
      const subscriber = auth().onAuthStateChanged(authStateChangedAction);
      const url = await storage().ref(mainLogoRef).getDownloadURL();
      SetUrl(url);
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

  return (
    <authContext.Provider
      value={{user: user, setUser: setUser, mainLogo: url!}}>
      <NavigationContainer>
        {user === undefined ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="LogIn" component={LogInScreen}></Stack.Screen>
            <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Menu></Menu>
        )}
      </NavigationContainer>
    </authContext.Provider>
  );
}

export default App;
