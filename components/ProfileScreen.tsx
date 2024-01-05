import {Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authContext} from '../App';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  return (
    <authContext.Consumer>
      {({user, setUser}) => {

        const handleLogOut = () => {
          auth()
            .signOut()
            .then(() => {
              setUser(undefined);
              console.log('User signed out!');
            });
        };

        return (
          <SafeAreaView
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text> Profile </Text>
            <Image source={{uri: 'urldiprova'}} alt="immafine profilo"></Image>
            <Text> {user.name || 'UID not available'} </Text>
            <Text> {user.surname} </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: '30%',
                borderRadius: 20,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onPress={handleLogOut}>
              <Text
                style={{
                  width: 'auto',
                  textAlign: 'center',
                  fontSize: 20,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                LogOut
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }}
    </authContext.Consumer>
  );
};

export default ProfileScreen;
