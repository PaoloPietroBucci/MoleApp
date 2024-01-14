import {useEffect, useState} from 'react';
import {FlatList, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Team from '../model/Team';
import {getTeams} from '../firebase/teamApi';
import {styles} from '../styles';
import { Pressable } from 'react-native';
import PlayersScreen from './PlayersScreen';

const TeamsScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teams = await getTeams();
      setTeams(teams);
    };
    fetchTeams();
  },[]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalParam, setModalParam] = useState('');

  const openSettingsModal = (param : string) => {
    setModalParam(param);
    setModalVisible(!modalVisible);
  }

  function renderItem({item}: {item: Team}): any {
    return (
      <Pressable 
        onPress = {() => {openSettingsModal(item.name)}}>
        <View style={styles.columnContainer}>
          <View style={styles.bigLogoContainer}>
            <Image
              source={{uri: item.logoURL}}
              style={styles.logoImage}></Image>
          </View>
          <Text> {item.name} </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> Teams </Text>
      
      <Modal
          animationType = 'slide'
          transparent = {true}
          visible = {modalVisible}
          onRequestClose = {() => {
            setModalVisible(!modalVisible);
          }}>
          <View>
          <View>
            <PlayersScreen teamName = {modalParam}></PlayersScreen>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
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

const teamStyle = StyleSheet.create({
});

export default TeamsScreen;
