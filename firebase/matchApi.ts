import firestore, {Filter} from '@react-native-firebase/firestore';
import User from '../model/User';
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
