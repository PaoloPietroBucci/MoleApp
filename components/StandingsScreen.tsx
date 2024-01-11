import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getTeamsByGroup} from '../firebase/teamApi';
import Team from '../model/Team';
import {calculateStat} from '../services/rankingCalc';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const GroupHeader: React.FC<{ groupName: string }> = ({groupName}) => {
  return (
    <View style={styles.groupHeader}>
      <Text style={styles.headerField}>{groupName}</Text>
      <Text style={styles.headerField}>PTS</Text>
      <Text style={styles.headerField}>GF</Text>
    </View>
  );
};

const StandingsScreen = () => {
  const [groupA, setGroupA] = useState<Team[]>([]);
  const [groupB, setGroupB] = useState<Team[]>([]);
  const [groupC, setGroupC] = useState<Team[]>([]);

  useEffect(() => {
    const calculate = async () => {
      setGroupA(await calculateStat(await getTeamsByGroup('A')));
      setGroupB(await calculateStat(await getTeamsByGroup('B')));
      setGroupC(await calculateStat(await getTeamsByGroup('C')));
    };
    calculate();
  }, []);

  const renderItem = ({item, index}: {item: Team; index: number}) => (
    <View style={styles.groupRow}>
      <Text style={{...styles.stat, fontWeight: 'bold'}}>{index + 1}</Text>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.stat}>{item.points}</Text>
      <Text style={styles.stat}>{item.totalGoals}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      {/*Group A*/}
      <View style={styles.group}>
        <GroupHeader
        groupName='Group A'></GroupHeader>
        <FlatList<Team>
          data={groupA}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      </View>
      {/*Group B*/}
      <View style={styles.group}>
        <GroupHeader
        groupName='Group B'></GroupHeader>
        <FlatList<Team>
          data={groupB}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      </View>
      {/*Group C*/}
      <View style={styles.group}>
        <GroupHeader
        groupName='Group C'></GroupHeader>
        <FlatList<Team>
          data={groupC}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  group: {display: 'flex', margin: 20},
  groupRow: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  teamName: {fontWeight: 'bold', margin: 10},
  stat: {margin: 10},
  groupHeader: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  headerField: {
    color: 'white',
    margin: 10,
  },
});

export default StandingsScreen;
