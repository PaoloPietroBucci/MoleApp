import React, {FC, useContext, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import {
  Text,
  StyleSheet,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import User from '../model/User';
import {addUser} from '../firebase/userApi';
import ImagePicker from './ImagePicker';
import {authContext} from '../App';
import {styles} from '../styles';

const SignInScreen = () => {
  const {setUser} = useContext(authContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  async function handleLogin() {
    const newUser: User = {
      name: name,
      surname: surname,
      email: username,
      password: password,
      photoURL: photoURL,
      dateOfBirth: dateOfBirth!,
    };
    try {
      const user = await auth().createUserWithEmailAndPassword(
        username,
        password,
      );
      console.log(photoURL);
      const ref = storage().ref(`users_profile_images/${user.user.uid}.jpeg`);
      const result = await ref.putFile(photoURL);
      newUser.photoURL = `users_profile_images/${user.user.uid}.jpeg`;
      await addUser(newUser);
      setUser(newUser);
    } catch (error: any) {
      setErrors(error);
    }
  }

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <Text style={styles.title}>Sign In</Text>
      {errors && <View><Text style={styles.error}>{errors}</Text></View>}
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
      <View style={signInstyles.dateContainer}>
        <TextInput style={signInstyles.dateInput} editable={false}>
          {dateOfBirth ? dateOfBirth?.toDateString() : 'Select your bith date'}
        </TextInput>
        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={{
            marginLeft: 10,
          }}>
          <AntIcon name="calendar" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode="date"
        open={modalOpen}
        date={new Date()}
        onConfirm={date => {
          setModalOpen(false);
          setDateOfBirth(date);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
      <ImagePicker photoURL={photoURL} setPhotoURL={setPhotoURL} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text
          style={styles.buttonText}>
          SingIn
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const signInstyles = StyleSheet.create({
  dateContainer: {
    margin: 20,
    paddingLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateInput: {
    width: 250,
    height: 'auto',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    color: 'black',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SignInScreen;
