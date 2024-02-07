import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {authContext} from '../App';
import storage from '@react-native-firebase/storage';
import {styles} from '../styles';
import DeviceInfo from 'react-native-device-info';

const ProfileScreen = () => {
  const {user, setUser} = useContext(authContext);
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    const getUrl = async () => {
      try {
        const url = await storage().ref(user!.photoURL).getDownloadURL();
        setPhoto(url);
      } catch {
        setPhoto(undefined);
      }
    };
    getUrl();
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
      <Text adjustsFontSizeToFit style={styles.title}> Profile </Text>
      <Image
        source={
          photo !== undefined || null
            ? {uri: photo}
            : require('../assets/NoPhoto.webp')
        }
        style={profileStyle.profileImage}></Image>
      <View  style={DeviceInfo.isTablet()?[profileStyle.fieldContainer,{width:screenWidth*0.6}]:profileStyle.fieldContainer}>
        <Text adjustsFontSizeToFit style={profileStyle.userData}>
          {`${user?.name}  ${user?.surname}`}
        </Text>
      </View>
      <View style={DeviceInfo.isTablet()?[profileStyle.fieldContainer,{width:screenWidth*0.6}]:profileStyle.fieldContainer}>
        <Text style={profileStyle.userData}>
          { (user!.dateOfBirth instanceof  Date) ? user!.dateOfBirth.toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }) :
          user!.dateOfBirth.toDate().toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </View>
      <View style={DeviceInfo.isTablet()?[profileStyle.fieldContainer,{width:screenWidth*0.6}]:profileStyle.fieldContainer}>
        <Text adjustsFontSizeToFit style={[profileStyle.userData, {fontSize:25}]}> {user!.email} </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const profileStyle = StyleSheet.create({
  userData: {
    textAlign:'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  profileImage: {
    flex:2,
    marginBottom: 15,
    width: screenHeight / 4,
    height: screenHeight / 4,
    borderRadius: screenHeight / 8,
  },
  fieldContainer:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    marginVertical:5,
    width : screenWidth*0.8,
    borderRadius:10,
    borderWidth:1
  }
});

export default ProfileScreen;
