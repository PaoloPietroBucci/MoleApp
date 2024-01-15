import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {useContext, useEffect, useState} from 'react';
import Match from '../model/Match';
import {getFutureMatches} from '../firebase/matchApi';
import { getTeamLogoUrl } from '../firebase/teamApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { authContext } from '../App';
import AddMatchScreen from './AddMatchScreen';

function HomeScreen() {
  const {user, setUser} = useContext(authContext)
  const [showModal, setShowModal] = useState(false)
  const [futureMatches, setfutureMatches] = useState<Match[] | any>();
  const [teamLogos, setTeamLogos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFutureMatches = async () => {
      try{
      const matches = await getFutureMatches();
      const logos : { [key: string]: string } = {}
      await Promise.all(
        matches.map(async (match) => {
          const logoUrlTeam1 = await getTeamLogoUrl(match.team1);
          const logoUrlTeam2 = await getTeamLogoUrl(match.team2);
          logos[match.team1] = logoUrlTeam1;
          logos[match.team2] = logoUrlTeam2;
        })
      );
      setTeamLogos(logos)
      setfutureMatches(matches);
    }catch{
      
    }
    };
    fetchFutureMatches();
  }, []);

   function renderItem({item}: {item: Match}): any {
    const urlTeam1 = teamLogos[item.team1];
    const urlTeam2 = teamLogos[item.team2];
    return (
      <>
        <View style={homeStyles.matchContainer}>
          <Text style={homeStyles.date}>{item.date.toDate().toDateString()}</Text>
          <View style={homeStyles.teamsContainer}>
            <View style={homeStyles.leftTeamBox}>
              <View style={styles.smallLogoContainer}>
                <Image source={{uri:urlTeam1}} style={styles.smallLogoContainer}></Image>
              </View>
              <Text style={homeStyles.teamName}> {item.team1} </Text>
            </View>
            <View style={homeStyles.separator}>
              <Text style={{textAlign: 'center'}}> - </Text>
            </View>
            <View style={homeStyles.rightTeamBox}>
              <View style={styles.smallLogoContainer}>
              <Image source={{uri:urlTeam2}} style={styles.smallLogoContainer}></Image>
              </View>
              <Text style={homeStyles.teamName}> {item.team2} </Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  return (

    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Home </Text>
      <Text style={{fontSize:15, fontWeight:'800'}}>Upcoming Matches</Text>
      <FlatList
        data={futureMatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}>
        </FlatList>
        {!user?.admin &&<Pressable
            onPress={() => setShowModal(true)}>
        <View style={homeStyles.iconContainer}>
        <MaterialIcons name='add' size={30}></MaterialIcons>
        </View>
        </Pressable>}
        <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}> 
        <AddMatchScreen></AddMatchScreen>
      </Modal>
    </SafeAreaView>
  );
}
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const homeStyles = StyleSheet.create({
  iconContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:'rgba(236, 30, 78, 0.95)'
  },
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
    marginBottom:20
  },

  leftTeamBox: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightTeamBox: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default HomeScreen;
