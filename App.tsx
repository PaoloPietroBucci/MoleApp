import LogInScreen from './components/LogInScreen';
import SignInScreen from './components/SignInScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';


function App(): JSX.Element {

  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.debug('starting', user);
    auth().onAuthStateChanged((user: any) => {
      console.trace('changed', user);
      setUser(user);
      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, []);

  return (

    <NavigationContainer>
      {user == null ? (
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogInScreen}></Stack.Screen>
          <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <HomeScreen></HomeScreen>
      )}
    </NavigationContainer>
  );
}

export default App;
