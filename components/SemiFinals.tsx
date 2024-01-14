import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getTeamsByGroup} from '../firebase/teamApi';
import Team from '../model/Team';
import {calculateStat} from '../services/rankingCalc';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Match from '../model/Match';
import { getSemiFinalsMatches } from '../firebase/matchApi';
import StandingsContoll from './utils/standingsControll';


const SemiFinals = () => {

  const [matches, setMetches] = useState<Match[]>()

  useEffect(()=>{
    const fetchFinalsTeam = async ()=>{
      const matches : Match[] =  await getSemiFinalsMatches() 
      setMetches(matches)
    }
    fetchFinalsTeam()
  },[])


 const navigation = useNavigation<any>()
 return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Text style={styles.title}> Standings </Text>
    <StandingsContoll navigation={navigation} current='Semi Finals' next='finals' prev='quarterFinals'></StandingsContoll>
  </ScrollView>
);
};

const standingStyles = StyleSheet.create({
  stanavigationControlls: {},
});

export default SemiFinals;
