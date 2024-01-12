import firestore, {Filter, firebase} from '@react-native-firebase/firestore';
import Match from '../model/Match';

export async function getGroupMatchesByTeam(
  teamName: string,
): Promise<Match[]> {
  var matches: Match[] = [];
  try {
    const result = await firestore()
      .collection('Matches')
      .where('groupMatch', '==', true)
      .get();
    result.forEach(document => {
      const matchData = document.data() as Match;
      if (matchData.team1 === teamName || matchData.team2 === teamName) {
        matches.push(matchData);
      }
    });
    return matches;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}

export async function getGroupMatchesByTeam1(
  teamName: string,
): Promise<Match[]> {
  var matches: Match[] = [];
  try {
    let Filter = firebase.firestore.Filter;
    const result = await firestore()
      .collection('Matches')
      .where('groupMatch', '==', true)
      .where(
        Filter.or(
          Filter('team1', '==', teamName),
          Filter('team2', '==', teamName),
        ),
      )
      .get();
    result.forEach(document => {
      const matchData = document.data() as Match;
      matches.push(matchData);
    });
    return matches;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}

export async function getKnokOutMatches() {
  var matches: Match[] = [];
  try {
    const result = await firestore()
      .collection('Matches')
      .where('groupMatch', '==', false)
      .get();
    result.forEach(document => {
      const matchData = document.data() as Match;
      matches.push(matchData);
    });
    return matches;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}

export async function getFutureMatches(): Promise<Match[]> {
  let now = firestore.Timestamp.fromDate(new Date());
  var matches: Match[] = [];
  try {
    const snapshot = await firestore()
      .collection('Matches')
      .where('date', '>=', now)
      .limit(4)
      .get();
    snapshot.forEach(document => {
      matches.push(document.data() as Match);
    });
    return matches;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}
