import {Image, SafeAreaView} from 'react-native';
import {styles} from '../styles';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        source={require('../assets/MoleCup_mainlogo.png')}
        style={styles.mainLogo}></Image>
    </SafeAreaView>
  );
};
