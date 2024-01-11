import {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Team from '../model/Team';
import {getTeams} from '../firebase/teamApi';
import {styles} from '../styles';

const TeamsScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teams = await getTeams();
      setTeams(teams);
    };
    fetchTeams();
  });

  function renderItem({item}: {item: Team}): any {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.bigLogoContainer}>
            <Image
              source={{uri: item.logoURL}}
              style={styles.logoImage}></Image>
          </View>
          <Text> {item.name} </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Teams </Text>
      <FlatList<Team>
        data={teams}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        contentContainerStyle={teamStyle.listContentContainer}
        horizontal={false}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

const teamStyle = StyleSheet.create({
  listContentContainer: {},
});

export default TeamsScreen;
