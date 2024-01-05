import firestore, {Filter} from '@react-native-firebase/firestore';
import User from '../model/User';
import Match from '../model/Match';

export async function getGroupMatchesByTeam(teamName: string): Promise<Match[]> {
  var matches: Match[] =[];
  try{
  const result = await firestore()
    .collection('Matches')
    .where(
      Filter.and(
        Filter('groupMatch', '==', true),
        Filter.or(
          Filter('team1', '==', teamName),
          Filter('team2', '==', teamName),
        ),
      ),
    )
    .get();
    result.forEach((document)=> matches.push(document.data() as Match))
    return matches;}
    catch{
        throw Error();
        
    }
}
