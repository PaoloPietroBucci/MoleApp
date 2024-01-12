import {View, Text, Image, FlatList, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {useEffect, useState} from 'react';
import Match from '../model/Match';
import {getFutureMatches} from '../firebase/matchApi';

function HomeScreen() {
  const [futureMatches, setfutureMatches] = useState<Match[]>();

  useEffect(() => {
    const fetchFutureMatches = async () => {
      const matches = await getFutureMatches();
      setfutureMatches(matches);
    };
    fetchFutureMatches();
  });

  function renderItem({item}: {item: Match}): any {
    return (
      <>
      <Text>Date</Text>
      <View style={[homeStyles.matchContainer]}>
        <View style={homeStyles.leftTeamBox}>
          <View style={styles.smallLogoContainer}></View>
          <Text> {item.team1} </Text>
        </View>
        <View style={{backgroundColor: 'grey'}}>
          <Text> - </Text>
        </View>
        <View style={homeStyles.rightTeamBox}>
          <View style={styles.smallLogoContainer}></View>
          <Text> {item.team2} </Text>
        </View>
      </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Home </Text>
      <View>
        <FlatList
          data={futureMatches}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}></FlatList>
      </View>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({

  matchContainer: {
    width:'70%',
    marginVertical: 30,
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border:1,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      }})
  },

  leftTeamBox: {
    display: 'flex',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  rightTeamBox: {
    display: 'flex',
    flex: 2,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
});

export default HomeScreen;
