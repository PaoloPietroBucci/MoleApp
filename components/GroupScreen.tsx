import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Team from '../model/Team';
import {useEffect, useState} from 'react';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import StandingsContoll from './utils/standingsControll';

const GroupHeader: React.FC<{groupName: string}> = ({groupName}) => {
  return (
    <View style={groupStyles.groupHeader}>
      <View style={groupStyles.leftSide}>
        <Text style={groupStyles.headerField}>{groupName}</Text>
      </View>
      <View style={groupStyles.rightSide}>
        <Text style={groupStyles.headerField}>PTS</Text>
        <Text style={groupStyles.headerField}>GF</Text>
      </View>
    </View>
  );
};
const GroupScreen = () => {
  const navigation = useNavigation<any>();
  const [groupA, setGroupA] = useState<Team[]>([]);
  const [groupB, setGroupB] = useState<Team[]>([]);
  const [groupC, setGroupC] = useState<Team[]>([]);

  useEffect(() => {
    const calculate = async () => {
      const teams = [
        {
          group: 'A',
          logoURL: 'loghi/gioberti.png',
          name: 'Gioberti',
          penaltyGoals: 0,
          players: '',
          points: 0,
          totalGoals: 0,
        },
        {
          group: 'A',
          logoURL: 'loghi/cattaneo.jpg',
          name: 'Cattaneo',
          penaltyGoals: 5,
          players: '',
          points: 0,
          totalGoals: 0,
        },
        {
          group: 'A',
          logoURL: 'loghi/santorre.jpg',
          name: 'Santorre',
          penaltyGoals: 0,
          players: '',
          points: 0,
          totalGoals: 0,
        },
        {
          group: 'A',
          logoURL: 'loghi/logo santanna.png',
          name: "Sant'Anna",
          penaltyGoals: 4,
          players: '',
          points: 0,
          totalGoals: 0,
        },
      ];

      // setGroupA(await calculateStat(await getTeamsByGroup('A')));
      // setGroupB(await calculateStat(await getTeamsByGroup('B')));
      // setGroupC(await calculateStat(await getTeamsByGroup('C')));
      setGroupA(teams);
      setGroupB(teams);
      setGroupC(teams);
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
          <Text style={groupStyles.teamName}>{item.name}</Text>
          {/* logo */}
        </View>
        <View style={groupStyles.rightSide}>
          <Text style={groupStyles.stat}>{item.points}</Text>
          <Text style={groupStyles.stat}>{item.totalGoals}</Text>
        </View>
      </View>
    ));
  };

  const renderItem = ({item, index}: {item: Team; index: number}) => (
    <View style={groupStyles.groupRow}>
      <View style={groupStyles.leftSide}>
        <Text style={{...groupStyles.stat, fontWeight: 'bold'}}>
          {index + 1}
        </Text>
        <Text style={groupStyles.teamName}>{item.name}</Text>
        {/* logo */}
      </View>
      <View style={groupStyles.rightSide}>
        <Text style={groupStyles.stat}>{item.points}</Text>
        <Text style={groupStyles.stat}>{item.totalGoals}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}> Standings </Text>
      <StandingsContoll navigation={navigation} next='quarterFinals' current='Group Stage'></StandingsContoll>
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
        {renderListItems(groupB)}
      </View>
    </ScrollView>
  );
};

const groupStyles = StyleSheet.create({
  groupRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamName: {fontWeight: 'bold', margin: 8},
  stat: {marginHorizontal: 17, marginVertical: 8, fontWeight: 'bold'},
  group: {
    width: '80%',
    marginBottom: 20,
  },
  groupHeader: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  headerField: {
    color: 'white',
    margin: 10,
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default GroupScreen;
