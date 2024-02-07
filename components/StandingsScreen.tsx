import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import QuarterFinlas from './QuarterFinals';
import SemiFinals from './SemiFinals';
import Finals from './Finals';
import GroupScreen from './GroupScreen';
import { useContext } from 'react';
import { authContext } from '../App';

const StandingsScreen = () => {
  const Stack = createStackNavigator();
  const {season} = useContext(authContext)
  return (

      <NavigationContainer independent={true}>
        <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
          <Stack.Screen name="group" component={GroupScreen} initialParams={{season:season}}></Stack.Screen>
          <Stack.Screen name="quarterFinals" component={QuarterFinlas} initialParams={{season:season}}></Stack.Screen>
          <Stack.Screen name="semiFinals" component={SemiFinals} initialParams={{season:season}}></Stack.Screen>
          <Stack.Screen name="finals" component={Finals} initialParams={{season:season}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>



  )}

  export default StandingsScreen