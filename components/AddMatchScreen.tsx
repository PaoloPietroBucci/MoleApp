import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from '../styles';
import Team from '../model/Team';
import {getTeams} from '../firebase/teamApi';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {addMatch} from '../firebase/matchApi';
import Match from '../model/Match';
import {CheckBox} from 'react-native-elements';
import {validateNewMatchForm} from '../services/validateInput';

const AddMatchScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>();
  const [team1, setTeam1] = useState<string>();
  const [team2, setTeam2] = useState<string>();
  const [round, setRound] = useState<string>('group');
  const [matchDate, setMatchDate] = useState<Date>();
  const [goalTeam1, setGolTeam1] = useState<number>();
  const [goalTeam2, setGolTeam2] = useState<number>();
  const [penaltyGoaloalTeam1, setPenaltyGolTeam1] = useState<number>();
  const [penaltyGoaloalTeam2, setPenaltyGolTeam2] = useState<number>();
  const [penalties, setPenalties] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const rounds = ['group', 'quarters', 'semifinals', 'finals'];

  const handleSubmin = async () => {
    const result = validateNewMatchForm(
      team1!,
      team2!,
      matchDate!,
      round!,
      goalTeam1!,
      goalTeam2!,
      penalties,
      penaltyGoaloalTeam1!,
      penaltyGoaloalTeam2!,
    );
    if (result !== 'valid') {
      setError(result);
    } else {
      setError(undefined)
      const newMatch: Match = {
        team1: team1!,
        team2: team2!,
        date: matchDate!,
        round: round!,
        goalTeam1: goalTeam1,
        goalTeam2: goalTeam2,
        penalties: penalties!,
        penaltyGoalTeam1: penaltyGoaloalTeam1,
        penaltyGoalTeam2: penaltyGoaloalTeam2,
      };
      setTeam1(teams![0].name),
      setTeam2(teams![0].name),
      setRound('group'),
      setMatchDate(undefined),
      setGolTeam1(undefined),
      setGolTeam2(undefined),
      setPenalties(false),
      setPenaltyGolTeam1(undefined),
      setPenaltyGolTeam2(undefined),
      setIsChecked(false)

      try {
        await addMatch(newMatch);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPenalties(true);
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
        setTeam1(allTeams[0].name);
        setTeam2(allTeams[0].name);
        setTeams(allTeams);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (teams !== undefined) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {fontSize: 42}]}>Add a new match</Text>
        {error && (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
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
        <View
          style={[
            addMatchStyle.picker,
            {
              flex: 0,
              width: '50%',
              height: 50,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Picker selectedValue={round} onValueChange={handlePicker3Change}>
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
          mode="datetime"
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
                  setGolTeam1(parseInt(score));
                }}></TextInput>
              <Text>Score</Text>
              <TextInput
                style={[
                  styles.input,
                  {width: 70, height: 50, textAlign: 'center'},
                ]}
                keyboardType="numeric"
                onChangeText={score => {
                  setGolTeam2(parseInt(score));
                }}></TextInput>
            </View>
            {round !== 'group' ? (
              <View style={[addMatchStyle.row, {width:350}]}>
                <CheckBox disabled = {goalTeam1 == goalTeam2? false : true}
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
                        setPenaltyGolTeam1(parseInt(score));
                      }}></TextInput>
                    <Text>Score</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {width: 70, height: 50, textAlign: 'center'},
                      ]}
                      keyboardType="numeric"
                      onChangeText={score => {
                        setPenaltyGolTeam2(parseInt(score));
                      }}></TextInput>
                  </>
                ) : (
                  ''
                )}
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginVertical: 30,
    marginHorizontal: 10,
    flex: 3,
    color: '#344953',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
  },
  row: {
    marginVertical: 30,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default AddMatchScreen;
