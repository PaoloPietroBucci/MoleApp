import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../styles';
import Team from '../model/Team';
import {getTeams} from '../firebase/teamApi';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {addUser} from '../firebase/userApi';
import {addMatch} from '../firebase/matchApi';
import Match from '../model/Match';
import {CheckBox} from 'react-native-elements';

const AddMatchScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>();
  const [team1, setTeam1] = useState<string>();
  const [team2, setTeam2] = useState<string>();
  const [round, setRound] = useState<string>();
  const [matchDate, setMatchDate] = useState<Date>();
  const [goalTeam1, setGolTeam1] = useState<string>();
  const [goalTeam2, setGolTeam2] = useState<string>();
  const [penalties, setPenalties] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState();
  const rounds = ['group', 'quarters', 'semifinals', 'finals'];

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handlePicker1Change(team: string) {
    setTeam1(team);
  }
  function handlePicker2Change(team: string) {
    setTeam2(team);
  }
  function handlePicker3Change(round: string) {
    setRound(round);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const allTeams = await getTeams();
        setTeams(allTeams);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (teams !== undefined) {
    /*const newMatch: Match = {
        team1: team1,
        team2: team2,
        date: matchDate,
        goalTeam1: goalTeam1,
        goalTeam2: goalTeam2,
        round: round,

      };*/
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.title}>Add a new match</Text>
        <View style={addMatchStyle.dateContainer}>
          <TextInput style={addMatchStyle.dateInput} editable={false}>
            {matchDate ? matchDate?.toDateString() : 'Select match date'}
          </TextInput>
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              marginLeft: 10,
            }}>
            <AntIcon name="calendar" color="black" size={30} />
          </TouchableOpacity>
        </View>
          <View style={[addMatchStyle.picker, {flex:0, width: '50%', height:50}]}>
            <Picker
              selectedValue={round}
              onValueChange={handlePicker3Change}>
              {rounds!.map((round, index) => (
                <Picker.Item key={index} label={round} value={round} />
              ))}
            </Picker>
          </View>
        <View style={[addMatchStyle.row]}>
          <View style={addMatchStyle.picker}>
            <Picker selectedValue={team1} onValueChange={handlePicker1Change}>
              {teams!.map((team, index) => (
                <Picker.Item key={index} label={team.name} value={team.name} />
              ))}
            </Picker>
          </View>
          <View style={addMatchStyle.separator}>
            <Text style={{textAlign: 'center'}}> - </Text>
          </View>
          <View style={addMatchStyle.picker}>
            <Picker selectedValue={team2} onValueChange={handlePicker2Change}>
              {teams!.map((team, index) => (
                <Picker.Item key={index} label={team.name} value={team.name} />
              ))}
            </Picker>
          </View>
        </View>
        <DatePicker
          modal
          mode="date"
          open={modalOpen}
          date={new Date()}
          onConfirm={date => {
            setModalOpen(false);
            setMatchDate(date);
          }}
          onCancel={() => {
            setModalOpen(false);
          }}
        />

        {matchDate! < new Date() && !undefined ? (
          <View>
            <View style={[addMatchStyle.row]}>
              <TextInput
                style={[
                  styles.input,
                  {width: 70, height: 50, textAlign: 'center'},
                ]}
                keyboardType="numeric"
                onChangeText={score => {
                  setGolTeam1(score);
                }}></TextInput>
              <Text>Score</Text>
              <TextInput
                style={[
                  styles.input,
                  {width: 70, height: 50, textAlign: 'center'},
                ]}
                keyboardType="numeric"
                onChangeText={score => {
                  setGolTeam2(score);
                }}></TextInput>
            </View>
            <View style={[addMatchStyle.row]}>
              <CheckBox
                title="Penalties"
                checked={isChecked}
                onPress={handleCheckboxChange}
              />
              {isChecked ? (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      {width: 70, height: 50, textAlign: 'center'},
                    ]}
                    keyboardType="numeric"
                    onChangeText={score => {
                      setGolTeam1(score);
                    }}></TextInput>
                  <Text>Score</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {width: 70, height: 50, textAlign: 'center'},
                    ]}
                    keyboardType="numeric"
                    onChangeText={score => {
                      setGolTeam2(score);
                    }}></TextInput>
                </>
              ) : (
                ''
              )}
            </View>
          </View>
        ) : (
          <View></View>
        )}
        <View>
          <TouchableOpacity
            style={styles.button} /*onPress={addMatch(newMatch)}*/
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return;
    <Text>team undefined</Text>;
  }
};

const addMatchStyle = StyleSheet.create({
  dateContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateInput: {
    width: 250,
    height: 'auto',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    color: 'black',
  },
  separator: {
    flex: 1,
  },
  picker: {
    marginVertical:30,
    marginHorizontal:10,
    flex: 3,
    color: '#344953',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius:15
  },
  row: {
    marginVertical:20,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around'
  },
});

export default AddMatchScreen;
