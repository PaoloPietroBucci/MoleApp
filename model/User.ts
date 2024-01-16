import {firebase} from '@react-native-firebase/firestore';

export default interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  photoURL: string;
  dateOfBirth: Date | any;
  admin: boolean
}
