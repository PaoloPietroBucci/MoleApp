import firestore, {Filter} from '@react-native-firebase/firestore';
import Team from '../model/Team';

export async function getTeamsByGroup(group: string): Promise<Team[]> {
  var teams: Team[] =[];
  try{
  const result = await firestore()
    .collection('Matches')
    .where(
        Filter('group', '==', group)
        )
    .get();
    result.forEach((document)=> teams.push(document.data() as Team))
    return teams;}
    catch{
        throw Error()
    }
}
