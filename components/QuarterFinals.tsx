import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getTeamLogoUrl} from '../firebase/teamApi';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import Match from '../model/Match';
import StandingsContoll from './utils/StandingsControll';
import matchStyles from '../styles/matchStyle';
import {getMatchesByRound} from '../firebase/matchApi';

const QuarterFinlas = () => {
  const [matches, setMatches] = useState<Match[] | any>();
  const [teamLogos, setTeamLogos] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        var matches: Match[] | any = await getMatchesByRound('quarters');
        // matches = [
        //   {
        //     date: new Date(),
        //     goalTeam1: null,
        //     goalTeam2: null,
        //     groupMatch: true,
        //     penalties: false,
        //     team1: 'Alfieri',
        //     team2: 'Gioberti',
        //   },
        //   {
        //     date: new Date(),
        //     goalTeam1: null,
        //     goalTeam2: null,
        //     penalties: false,
        //     team1: "Sant'Anna",
        //     team2: 'Berti',
        //   },
        //   {
        //     date: new Date(),
        //     goalTeam1: null,
        //     goalTeam2: null,
        //     groupMatch: true,
        //     penalties: false,
        //     team1: 'Gioberti',
        //     team2: 'Galfer',
        //   },
        //   {
        //     date: new Date(),
        //     goalTeam1: null,
        //     goalTeam2: null,
        //     groupMatch: true,
        //     penalties: false,
        //     team1: 'Convitto',
        //     team2: 'Majorana',
        //   },
        // ];
        const logos: {[key: string]: string} = {};
        await Promise.all(
          matches.map(async (match: any) => {
            const logoUrlTeam1 = await getTeamLogoUrl(match.team1);
            const logoUrlTeam2 = await getTeamLogoUrl(match.team2);
            logos[match.team1] = logoUrlTeam1;
            logos[match.team2] = logoUrlTeam2;
          }),
        );
        setTeamLogos(logos);
        setMatches(matches);
      } catch {}
    };
    fetchTeams();
  }, []);

  function renderItem({item}: {item: Match}): any {
    const urlTeam1 = teamLogos[item.team1];
    const urlTeam2 = teamLogos[item.team2];
    return (
      <>
        <View style={matchStyles.matchContainer}>
          <Text style={matchStyles.date}>{item.date.toDate().toDateString()}</Text>
          <View style={matchStyles.teamsContainer}>
            <View style={matchStyles.leftTeamBox}>
              <View style={styles.smallLogoContainer}>
                <Image
                  source={{uri: urlTeam1}}
                  style={styles.smallLogoContainer}></Image>
              </View>
              <Text style={matchStyles.teamName}> {item.team1} </Text>
            </View>
            <View style={[matchStyles.separator]}>
              <Text style={{ textAlign: 'center',fontSize: 15}}>{item.goalTeam1} - {item.goalTeam2}</Text>
            </View>
            <View style={[matchStyles.rightTeamBox]}>
              <View style={styles.smallLogoContainer}>
                <Image
                  source={{uri: urlTeam2}}
                  style={styles.smallLogoContainer}></Image>
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
      <StandingsContoll
        navigation={navigation}
        current="Quarter Finals"
        next="semiFinals"
        prev="group"></StandingsContoll>
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
