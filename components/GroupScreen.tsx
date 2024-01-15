import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Team from '../model/Team';
import {useEffect, useState} from 'react';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import StandingsContoll from './utils/StandingsControll';
import {calculateStat} from '../services/rankingCalc';
import {getTeamLogoUrl, getTeams, getTeamsByGroup} from '../firebase/teamApi';

const GroupHeader: React.FC<{groupName: string}> = ({groupName}) => {
  return (
    <View style={groupStyles.groupHeader}>
      <View style={groupStyles.leftSide}>
        <Text style={[groupStyles.headerField, {width:100}]}>{groupName}</Text>
      </View>
      <View style={groupStyles.rightSide}>
        <Text
          style={[
            groupStyles.headerField,
          ]}>
          PTS
        </Text>
        <Text style={groupStyles.headerField}>GF</Text>
      </View>
    </View>
  );
};
const GroupScreen = () => {
  const navigation = useNavigation<any>();
  const [teamLogos, setTeamLogos] = useState<{[key: string]: string}>({});
  const [IsLoading, setIsLoading] = useState(true);
  const [groupA, setGroupA] = useState<Team[]>([]);
  const [groupB, setGroupB] = useState<Team[]>([]);
  const [groupC, setGroupC] = useState<Team[]>([]);

  useEffect(() => {
    const calculate = async () => {
      try {
        // const teams = [
        //   {
        //     group: 'A',
        //     logoURL: 'loghi/gioberti.png',
        //     name: 'Gioberti',
        //     penaltyGoals: 0,
        //     players: '',
        //     points: 0,
        //     totalGoals: 0,
        //   },
        //   {
        //     group: 'A',
        //     logoURL: 'loghi/cattaneo.jpg',
        //     name: 'Cattaneo',
        //     penaltyGoals: 5,
        //     players: '',
        //     points: 0,
        //     totalGoals: 0,
        //   },
        //   {
        //     group: 'A',
        //     logoURL: 'loghi/santorre.jpg',
        //     name: 'Santorre',
        //     penaltyGoals: 0,
        //     players: '',
        //     points: 0,
        //     totalGoals: 0,
        //   },
        //   {
        //     group: 'A',
        //     logoURL: 'loghi/logo santanna.png',
        //     name: "Sant'Anna",
        //     penaltyGoals: 4,
        //     players: '',
        //     points: 0,
        //     totalGoals: 0,
        //   },
        // ];
        const teams = await getTeams();
        const logos: {[key: string]: string} = {};
        await Promise.all(
          teams.map(async (team: Team) => {
            const logoUrlTeam = await getTeamLogoUrl(team.name);
            logos[team.name] = logoUrlTeam;
          }),
        );
        setTeamLogos(logos);
        setGroupA(await calculateStat(await getTeamsByGroup('A')));
        setGroupB(await calculateStat(await getTeamsByGroup('B')));
        setGroupC(await calculateStat(await getTeamsByGroup('C')));
          setIsLoading(false);
        // setGroupA(teams);
        // setGroupB(teams);
        // setGroupC(teams);
      } catch (error) {
        console.log(error);
      }
    };
    calculate();
  }, []);

  const renderListItems = (data: Team[]) => {
    return data.map((item, index) => (
      <View key={index} style={groupStyles.groupRow}>
        <View style={groupStyles.leftSide}>
          <Text style={{...groupStyles.stat, fontWeight: 'bold'}}>
            {index + 1}
          </Text>
          <View style={[styles.smallLogoContainer]}>
            <Image
              source={{uri: teamLogos[item.name]}}
              style={styles.logoImage}></Image>
          </View>
          <Text style={groupStyles.teamName}>{item.name}</Text>
        </View>
        <View style={groupStyles.rightSide}>
          <Text style={groupStyles.stat }>{item.points}</Text>
          <Text style={groupStyles.stat}>{item.totalGoals}</Text>
        </View>
      </View>
    ));
  };

  if (IsLoading) {
    return (
      <SafeAreaView style={[styles.pageContainer, {justifyContent:'center'}]}>
        <ActivityIndicator size={100} color="rgba(236, 30, 78, 0.95)" />
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}> Standings </Text>
        <StandingsContoll
          navigation={navigation}
          prev={undefined}
          next="quarterFinals"
          current="Group Stage"></StandingsContoll>
        {/*Group A*/}
        <View style={groupStyles.group}>
          <GroupHeader groupName="Group A"></GroupHeader>
          {renderListItems(groupA)}
        </View>
        {/*Group B*/}
        <View style={groupStyles.group}>
          <GroupHeader groupName="Group B"></GroupHeader>
          {renderListItems(groupB)}
        </View>
        {/*Group C*/}
        <View style={groupStyles.group}>
          <GroupHeader groupName="Group C"></GroupHeader>
          {renderListItems(groupC)}
        </View>
      </ScrollView>
    );
  }
};
const screenWidth = Dimensions.get('window').width;
const groupStyles = StyleSheet.create({
  groupRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  teamName: {fontWeight: 'bold', marginHorizontal: 8},
  stat: { fontWeight: 'bold', width: 40, textAlign:'center'},
  group: {
    width: screenWidth*0.8,
    marginBottom: 20,
  },
  groupHeader: {
    backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    width:screenWidth*0.8, 
    height: 40,
  },
  headerField: {
    width: 40,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  leftSide: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rightSide: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default GroupScreen;
