import firestore from '@react-native-firebase/firestore';
import User from '../model/User';

export async function getUser(email: string): Promise<User> {
  try {
    const user = await firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(res => {
        if (res)
        return res.docs[0].data() as User;
      });
    return user as User;
  } catch (error: any) {
    throw Error(error);
  }
}

export async function addUser(user: User) {
  const result = await firestore()
    .collection('Users')
    .add(user)
    .catch(error => console.log(error));
}
