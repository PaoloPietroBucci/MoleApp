import {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import Team from '../model/Team';
import {getTeams} from '../firebase/teamApi';
import {styles} from '../styles';
import {Pressable} from 'react-native';
import PlayersScreen from './PlayersScreen';

const TeamsScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try{
      const teams = await getTeams();
      setTeams(teams);
      }
      catch(error){}
    };
    fetchTeams();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalParam, setModalParam] = useState('');

  const openSettingsModal = (param: string) => {
    setModalParam(param);
    setModalVisible(!modalVisible);
  };

  function renderItem({item}: {item: Team}): any {
    return (
      <View style={styles.columnContainer}>
        <Pressable
          onPress={() => {
            openSettingsModal(item.name);
          }}>
          <View style={styles.bigLogoContainer}>
            <Image
              source={{uri: item.logoURL}}
              style={styles.logoImage}></Image>
          </View>
          <Text style={{textAlign:'center'}}> {item.name} </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Teams </Text>
      <Modal
      transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}> 
        <View style={teamStyle.modalCntainer}>
        <View style={teamStyle.modalContent}>
          <PlayersScreen teamName={modalParam}></PlayersScreen>
          <Pressable
            style={[styles.button]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          </View>
          </View>
      </Modal>
      <FlatList<Team>
        data={teams}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={3}
      />
    </SafeAreaView>
  );
};
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const teamStyle = StyleSheet.create({
  modalCntainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.)'
  },
  modalContent:{
    width: screenWidth*0.8,
    height: screenHeight*0.9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default TeamsScreen;
