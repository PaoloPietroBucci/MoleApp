import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getTeamLogoUrl, getTeamsByGroup} from '../firebase/teamApi';
import Team from '../model/Team';
import {calculateStat} from '../services/rankingCalc';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Match from '../model/Match';
import { getQuartersMatches } from '../firebase/matchApi';
import StandingsContoll from './utils/standingsControll';
import matchStyles from '../styles/matchStyle';

const QuarterFinlas = () => {

  const [matches, setMatches] = useState<Match[]| any>()
  const [teamLogos, setTeamLogos] = useState<{ [key: string]: string }>({});

  useEffect(()=>{
    const fetchTeams= async ()=>{
      // const matches : Match[] =  await getQuartersMatches() 
      
        const matches = [
          {
            date: new Date(),
            goalTeam1: null,
            goalTeam2: null,
            groupMatch: true,
            penalties: false,
            team1: 'Alfieri',
            team2: 'Gioberti',
          },
          {
            date: new Date(),
            goalTeam1: null,
            goalTeam2: null,
            penalties: false,
            team1: "Sant'Anna",
            team2: 'Berti',
          },
          {
            date: new Date(),
            goalTeam1: null,
            goalTeam2: null,
            groupMatch: true,
            penalties: false,
            team1: 'Gioberti',
            team2: 'Galfer',
          },
          {
            date: new Date(),
            goalTeam1: null,
            goalTeam2: null,
            groupMatch: true,
            penalties: false,
            team1: 'Convitto',
            team2: 'Majorana',
          },
        ];
        try{
          // setMetches(matches)
        const logos : { [key: string]: string } = {}
        await Promise.all(
          matches.map(async (match) => {
            const logoUrlTeam1 = await getTeamLogoUrl(match.team1);
            const logoUrlTeam2 = await getTeamLogoUrl(match.team2);
            logos[match.team1] = logoUrlTeam1;
            logos[match.team2] = logoUrlTeam2;
          })
        );
        setTeamLogos(logos)
        setMatches(matches);
      }catch{
      }
      };
      fetchTeams();
    }, []);

    function renderItem({item}: {item: Match}): any {
      const urlTeam1 = teamLogos[item.team1];
      const urlTeam2 = teamLogos[item.team2];
      return (
        <>
          <View style={matchStyles.matchContainer}>
            <Text style={matchStyles.date}>{item.date.toDateString()}</Text>
            <View style={matchStyles.teamsContainer}>
              <View style={matchStyles.leftTeamBox}>
                <View style={styles.smallLogoContainer}>
                  <Image source={{uri:urlTeam1}} style={styles.smallLogoContainer}></Image>
                </View>
                <Text style={matchStyles.teamName}> {item.team1} </Text>
              </View>
              <View style={matchStyles.separator}>
                <Text style={{textAlign: 'center'}}> - </Text>
              </View>
              <View style={matchStyles.rightTeamBox}>
                <View style={styles.smallLogoContainer}>
                <Image source={{uri:urlTeam2}} style={styles.smallLogoContainer}></Image>
                </View>
                <Text style={matchStyles.teamName}> {item.team2} </Text>
              </View>
            </View>
          </View>
        </>
      );
    }

  
  const navigation = useNavigation<any>();
  return (
      <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Standings </Text>
      <StandingsContoll navigation={navigation} current='Quarter Finals' next='semiFinals' prev='group'></StandingsContoll>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    </SafeAreaView>
  );
};

const standingStyles = StyleSheet.create({
  stanavigationControlls: {},
});

export default QuarterFinlas;
