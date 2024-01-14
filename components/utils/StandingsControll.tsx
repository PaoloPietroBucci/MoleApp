import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from '../../styles';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
const StandingsContoll = ({
  navigation,
  prev,
  next,
  current,
}: {
  navigation: any;
  prev?: string;
  next?: string;
  current: string;
}) => {
  return (
    <View style={styles.navigationControlls}>
      {prev === undefined && <View></View>}
      {prev !== undefined && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(prev);
          }}>
          <FontIcon name="arrow-left" size={20}></FontIcon>
        </TouchableOpacity>
      )}
      <Text>{current}</Text>
      {next !== undefined && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(next);
          }}>
          <FontIcon name="arrow-right" size={20}></FontIcon>
        </TouchableOpacity>
      )}
      {next === undefined && <View></View>}
    </View>
  );
};
export default StandingsContoll;
