import firestore, {Filter} from '@react-native-firebase/firestore';
import Team from '../model/Team';

export async function getTeamsByGroup(group: string): Promise<Team[]> {
    console.log(group)
  var teams: Team[] =[];
  try{
  const result = await firestore()
    .collection('Teams')
    .where('group', '==', group)
    .get();
    result.forEach((document)=> teams.push(document.data() as Team))
    return teams;}
    catch(error : any){
        console.error(error)
        throw Error(error)
    }
}
function QueryFilter(arg0: string, arg1: string, group: string): import("@react-native-firebase/firestore").FirebaseFirestoreTypes.QueryFilterConstraint | import("@react-native-firebase/firestore").FirebaseFirestoreTypes.QueryCompositeFilterConstraint {
    throw new Error('Function not implemented.');
}

