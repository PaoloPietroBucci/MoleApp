import firestore, {
  Filter,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import Team from '../model/Team';
import QueryDocumentSnapshot from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function getTeamsByGroup(group: string): Promise<Team[]> {
  var teams: Team[] = [];
  try {
    const result = await firestore()
      .collection('Teams')
      .where('group', '==', group)
      .get();
    result.forEach(document => {
      var team: Team = document.data() as Team;
      team.points = 0;
      teams.push(team);
    });
    return teams;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
}

export async function getTeams(): Promise<Team[]> {
  var teams: Team[] = [];
  try {
    const result = await firestore().collection('Teams').get();
    const documents = result.docs;
    for (const document of documents) {
      const team = document.data() as Team;
      if (team!.logoURL) {
        const url = await storage().ref(team!.logoURL).getDownloadURL();
        team!.logoURL = url;
      }
      teams.push(team!);
    }
    return teams;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
}


