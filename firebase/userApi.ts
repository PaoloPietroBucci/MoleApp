import firestore from '@react-native-firebase/firestore';
import User from '../model/User';

export async function getUser(uid: string): Promise<User> {
  return firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(res => {
      return res.data() as User;
    }
    )
    .catch(error => {
      console.log(error);
      return error;
    });
}

export function addUser(user:User){
  firestore()
  .collection('Users')
  .doc(user.uid)
  .set({
    name: user.name,
    surname : user.surname,
    username : user.username,
    password : user.password,
    photoURL : user.photoURL,
    phoneNumber : user.phoneNumber
  })
  .then(() => {
    console.log('User added!');
  });
}
