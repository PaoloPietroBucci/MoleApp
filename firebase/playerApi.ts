import firestore from '@react-native-firebase/firestore';
import Player from '../model/Player';

export async function getPlayersByTeam(selectedTeam: string): Promise<Player[]> {
  var players : Player[] = [];
  try {
    const result = await firestore()
      .collection('Players')
      .where('team', '==', selectedTeam)
      .get()
      result.forEach(document => {
        var p : Player = document.data() as Player;
        players.push(p);
      });
    return players;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
}
