import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import Player from '../model/Player';
import { getPlayersByTeam } from '../firebase/playerApi';
import { FlatList } from 'react-native';


const PlayersScreen = ({teamName} : {teamName : string}) => {
  const navigation = useNavigation<any>();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await getPlayersByTeam(teamName);
      setPlayers(players);
    };
    fetchPlayers();
  }, []);

  const renderListItems = ({item}: {item: Player}): any => {
    return (
      <View style={playersStyles.groupRow}>
        <View style={playersStyles.leftSide}>
          <Text style={{...playersStyles.stat, fontWeight: 'bold'}}>
          </Text>
          <Text style={playersStyles.teamName}>{item.name}</Text>
          <Text style={playersStyles.teamName}>{item.surname}</Text>
        </View>
        <View style={playersStyles.rightSide}>
          <Text style={playersStyles.stat}>{item.birth.toDate()}</Text>
          <Text style={playersStyles.stat}>{item.role}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}> 's team </Text>
      <View style={playersStyles.leftSide}>
        <Text style={playersStyles.headerField}>NAME</Text>
      </View>
      <View style={playersStyles.rightSide}>
        <Text>BIRTH</Text>
        <Text>ROLE</Text>
      </View>
      <FlatList<Player>
        data = {players}
        renderItem = {renderListItems}
        keyExtractor={(item, index) => index.toString()} 
        />

    </ScrollView>
  );
};

const playersStyles = StyleSheet.create({
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

export default PlayersScreen;
