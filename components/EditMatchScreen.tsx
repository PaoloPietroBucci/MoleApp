import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from '../styles';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native';
import {getMatchesWithoutScores, updateMatchScore} from '../firebase/matchApi';
import Match from '../model/Match';
import {CheckBox} from 'react-native-elements';
import { validateScoreEditMatch } from '../services/validateInput';

const EditMatchScreen = () => {
  const [matches, setMatches] = useState<Match[]>();
  const [match, setMatch] = useState<Match>();
  const [goalTeam1, setGolTeam1] = useState<number>();
  const [goalTeam2, setGolTeam2] = useState<number>();
  const [penaltyGoaloalTeam1, setPenaltyGolTeam1] = useState<number>();
  const [penaltyGoaloalTeam2, setPenaltyGolTeam2] = useState<number>();
  const [penalties, setPenalties] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [IsLoading, setIsLoading] = useState<boolean>(true)

  const handleSubmin = async () => {
    const result = validateScoreEditMatch(
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
      
      try {

        if(match != undefined){
          match.goalTeam1 = goalTeam1,
          match.goalTeam2 = goalTeam2,
          match.penalties = penalties,
          match.penaltyGoalTeam1 = penaltyGoaloalTeam1,
          match.penaltyGoalTeam2 = penaltyGoaloalTeam2

          await updateMatchScore(match);
        }

        setGolTeam1(undefined),
        setGolTeam2(undefined),
        setPenalties(false),
        setPenaltyGolTeam1(undefined),
        setPenaltyGolTeam2(undefined),
        setIsChecked(false)

      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setPenalties(true);
  };

  function handlePickerChange(match: Match) {
    setMatch(match);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const allMatches = await getMatchesWithoutScores();
        setMatches(allMatches)
        setMatch(allMatches[0])
        setIsLoading(false)
      } catch (error: any) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (matches !== undefined) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {fontSize: 42}]}>Edit a match</Text>
        {error && (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
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
          <Picker selectedValue={match} onValueChange={handlePickerChange}>
            {matches!.map((match, index) => (
              <Picker.Item key={index} label={match.team1+'-'+match.team2+' ('+match.date.toDate().toDateString()+')'} value={match} />
            ))}
          </Picker>
        </View>
        
        {match !== undefined ?(
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
            {match !== undefined && match.round !== 'group' ? (
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
    )
  } else if (!IsLoading){
    return <Text>match undefined</Text>;
  }
};

const addMatchStyle = StyleSheet.create({

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

export default EditMatchScreen;
