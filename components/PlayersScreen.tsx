import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import Player from '../model/Player';
import {getPlayersByTeam} from '../firebase/playerApi';
import {FlatList} from 'react-native';


const PlayersScreen = ({teamName}: {teamName: string}) => {
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
      <View
        style={[
          styles.rowContainer, {width:'80%'}
        ]}>
        <Text style={{fontWeight: '700', fontSize: 17, flex:2}}>
          {item.name} {item.surname}
        </Text>
        <Text style={{fontWeight: '700', fontSize: 17, flex:2}}>
          {item.birth.toDate().toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
        {item.role == 'attaccante' ? (
          <View style={[playersStyles.iconContainer, {flex: 1}]}>
            <Image
              source={require('../assets/striker_icon.webp')}
              style={playersStyles.icon}></Image>
          </View>
        ) : item.role == 'centrocampista' ? (
          <View style={[playersStyles.iconContainer, {flex: 1}]}>
            <Image
              source={require('../assets/midfielder_icon.webp')}
              style={playersStyles.icon}></Image>
          </View>
        ) : item.role == 'difensore' ? (
          <View style={[playersStyles.iconContainer, {flex: 1}]}>
            <Image
              source={require('../assets/defender_icon.webp')}
              style={playersStyles.icon}></Image>
          </View>
        ) : item.role == 'portiere' ? (
          <View style={[playersStyles.iconContainer, {flex: 1}]}>
            <Image
              source={require('../assets/keeper_icon.webp')}
              style={playersStyles.icon}></Image>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  return (
    <>
      <Text style={[styles.title, {fontSize: 30}]}> {teamName}'s team </Text>
      <FlatList<Player>
        data={players}
        renderItem={renderListItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const playersStyles = StyleSheet.create({
  iconContainer: {
    marginEnd:15,
    width: '100%',
    height: '100%',
  },
  icon:{
    height:'100%',
    width:'100%',
    resizeMode:'contain'
  }
});

export default PlayersScreen;
