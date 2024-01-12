import {firebase} from '@react-native-firebase/firestore';

const firebaseTimestamp =firebase.firestore.Timestamp

export default interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  photoURL: string;
  dateOfBirth: Date | typeof firebaseTimestamp
}
