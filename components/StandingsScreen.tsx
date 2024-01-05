import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getTeamsByGroup} from '../firebase/teamApi';
import Team from '../model/Team';
import {calculateStat} from '../services/rankingCalc';
import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const GroupHeader = () => {
  return (
    <View style={styles.groupHeader}>
      <Text style={styles.stat}>PTS</Text>
      <Text style={styles.stat}>GS</Text>
    </View>
  );
};

const StandingScreen = async () => {
  const [groupA, setGroupA] = useState<Team[]>([]);
  const [groupB, setGroupB] = useState<Team[]>([]);
  const [groupC, setGroupC] = useState<Team[]>([]);
  const [groupD, setGroupD] = useState<Team[]>([]);

  useEffect(() =>{
    const calculate = async () => {
    setGroupA(await calculateStat(await getTeamsByGroup('A')));
    setGroupB(await calculateStat(await getTeamsByGroup('B')));
    setGroupC(await calculateStat(await getTeamsByGroup('C')));
    setGroupD(await calculateStat(await getTeamsByGroup('D')));
    }
    calculate()
  }, []);

  const renderItem = ({item, index}: {item: Team; index: number}) => (
    <View style={styles.groupRow}>
      <Text style={{...styles.stat, fontWeight: 'bold'}}>{index}</Text>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.stat}>{item.points}</Text>
      <Text style={styles.stat}>{item.totalGoals}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.group}>
      <GroupHeader></GroupHeader>
      <FlatList<Team>
        data={groupA}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  group:{},
  groupRow: {},
  teamName: {},
  stat: {},
  groupHeader: {},
});
