import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getTeamsByGroup} from '../firebase/teamApi';
import Team from '../model/Team';
import {calculateStat} from '../services/rankingCalc';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {getFinalsMatches} from '../firebase/matchApi';
import Match from '../model/Match';
import {Dimensions} from 'react-native';
import StandingsContoll from './utils/standingsControll';

const Finals = () => {
  const [matches, setMetches] = useState<Match[]>();

  useEffect(() => {
    const fetchFinalsTeam = async () => {
      const matches: Match[] = await getFinalsMatches();
      setMetches(matches);
    };
    fetchFinalsTeam();
  }, []);

  const navigation = useNavigation<any>();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}> Standings </Text>
      <StandingsContoll navigation={navigation} current='Finals' prev='semiFinals'></StandingsContoll>
      <FlatList
        data={futureMatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    </ScrollView>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const standingStyles = StyleSheet.create({
  stanavigationControlls: {},
  matchContainer: {
    height: 120,
    width: screenWidth * 0.8,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },

  teamsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },

  leftTeamBox: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  rightTeamBox: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  teamName: {
    fontWeight: '600',
    fontSize: 18,
  },
  separator: {
    flex: 1,
  },
  date: {
    color: 'rgba(236, 30, 78, 0.95)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Finals;
