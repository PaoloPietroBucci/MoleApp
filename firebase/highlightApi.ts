import Highlight from "../model/Highlight";
import firestore, {Filter, firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function getTenHighlights() : Promise<Highlight[]>{
    var highlights: Highlight[] = [];
    try {
      const snapshot = await firestore()
        .collection('Highlights')
        .limit(10)
        .get();
      for (const doccument of snapshot.docs){
        const highlight = doccument.data() as Highlight
        const url = await storage().ref(highlight.urlReference).getDownloadURL();
        highlight.urlReference = url
        highlights.push(highlight);
      }
      return highlights;
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  }

