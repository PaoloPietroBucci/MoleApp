import {
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';

const PresentationSreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/MoleCup_mainlogo.png')}
        style={[presentationStyle.logo]}></Image>
      <Text style={[styles.title,{fontSize:40, margin:0}]}>Let's Get Started</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('LogIn');
        }}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignIn');
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const presentationStyle = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: 100,
    height: 300,
  },
});

export default PresentationSreen;
