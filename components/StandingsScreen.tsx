import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import QuarterFinlas from './QuarterFinals';
import SemiFinals from './SemiFinals';
import Finals from './Finals';
import GroupScreen from './GroupScreen';

const StandingsScreen = () => {
  const Stack = createStackNavigator();


  return (

      <NavigationContainer independent={true}>
        <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
          <Stack.Screen name="group" component={GroupScreen}></Stack.Screen>
          <Stack.Screen name="quarterFinals" component={QuarterFinlas}></Stack.Screen>
          <Stack.Screen name="semiFinals" component={SemiFinals}></Stack.Screen>
          <Stack.Screen name="finals" component={Finals}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>



  )}

  export default StandingsScreen