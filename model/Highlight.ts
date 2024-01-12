import {firebase} from '@react-native-firebase/firestore';

export default interface Highlight{
    title : string,
    urlReference : string,
    date : typeof firebase.firestore.Timestamp
}