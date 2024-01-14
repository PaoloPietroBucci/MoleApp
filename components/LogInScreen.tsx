import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from '../styles';

const LogInScreen = () => {
  const navigation = useNavigation<any>();
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: GestureResponderEvent) {
    try {
      await auth().signInWithEmailAndPassword(username, password);
    } catch (error) {
      setErrors(errors)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>LogIn</Text>

      {errors && <View><Text style={styles.error}>{errors}</Text></View>}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          You don't have an account? Sign in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const logInstyles = StyleSheet.create({
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
