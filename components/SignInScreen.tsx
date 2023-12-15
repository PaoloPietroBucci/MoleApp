import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from '../components/RootNavigation';

const LogInScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()

  function handleLogin(event: GestureResponderEvent) {
    
    auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      console.log('Bravo hai loggagto!!')
      //RootNavigation.navigate('HomeScreen', { userName: username });
  })
  }

  return (
    <SafeAreaView style={[styles.container, {height: '100%'}]}>
      <Text style={styles.title}>LogIn</Text>
      <View style={[styles.container, {width: '80%'}]}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={{
            marginTop: 20,
            width: '30%',
            borderRadius: 20,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              width: 'auto',
              textAlign: 'center',
              fontSize: 20,
              marginTop: 10,
              marginBottom: 10,
            }}>
            {' '}
            Login{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    paddingBottom: 80,
  },

  input: {
    marginVertical: 30,
    height: '15%',
    width: '80%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 2, // Spessore del bordo (puoi regolare questo valore)
    borderColor: 'black', // Colore del bordo
  },
  container: {
    marginVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default LogInScreen;
