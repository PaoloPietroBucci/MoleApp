import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {authContext} from '../App';
import storage from '@react-native-firebase/storage';
import {styles} from '../styles';

const ProfileScreen = () => {
  const {user, setUser} = useContext(authContext);
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    const getUrl = async () => {
      console.log(user);
      try{
      const url = await storage().ref(user!.photoURL).getDownloadURL();
      setPhoto(url);
      }
      catch{
        setPhoto(undefined)
      }
    };
    getUrl();
    console.log(photo);
  }, []);

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        console.log('User signed out!');
      });
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Profile </Text>
          <Image
            source={photo !== undefined || null ? {uri: photo} : require('../assets/NoPhoto.png')}
            style={profileStyle.profileImage}></Image>
          <Text style={profileStyle.username}> {`${user?.name}  ${user?.surname}`}  </Text>
          <Text style={profileStyle.userData}> {user!.dateOfBirth.toLocaleString('it-IT', {day: '2-digit', month: '2-digit', year: 'numeric'})} </Text>
          <Text style={profileStyle.userData}> {user!.email} </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogOut}>
        <Text
          style={styles.buttonText}>
          LogOut
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;

const profileStyle = StyleSheet.create({

  userData : {
    margin:5,
    fontWeight:'300',
    fontSize:15,
    color:'black'
  },

  username: {
    margin: 10,
    fontWeight:'bold',
    fontSize:30,
    color:'black'
  }, 
  profileImage: {
    marginVertical: 20,
    width: screenHeight / 4,
    height: screenHeight / 4,
    borderRadius: screenHeight / 8,
  },
});

export default ProfileScreen;
