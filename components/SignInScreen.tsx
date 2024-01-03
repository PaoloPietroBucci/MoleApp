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
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import User from '../model/User';
import { addUser } from '../firebase/userApi';

const LogInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const navigation = useNavigation();

  function handleLogin(event: GestureResponderEvent) {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(firebaseUser => {
        const user: User = {
          uid: firebaseUser.user.uid,
          name: name,
          surname: surname,
          username: firebaseUser.user.email!,
          password: password,
          photoURL: '',
          phoneNumber: '',
          dateOfBirth: dateOfBirth!,
        }
        addUser(user);
        console.log(`User ${username} loggato con successo`);
      });
  }

  return (
    <SafeAreaView style={[styles.container, {height: '100%'}]}>
      <View style={styles.row}>
        <TextInput
          placeholder="name"
          style={styles.input}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="surname"
          style={styles.input}
          onChangeText={text => setSurname(text)}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        </View>
        <View style={styles.row}>
        <DatePicker
          date={new Date()}
          onDateChange={date => setDateOfBirth(date)}
        />
        </View>
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
            }}>SingIn</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
});

export default LogInScreen;
