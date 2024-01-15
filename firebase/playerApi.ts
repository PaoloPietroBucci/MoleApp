import firestore from '@react-native-firebase/firestore';
import Player from '../model/Player';
import { getTeams } from './teamApi';

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

export async function addPlayersByTeam(){
  var players = [  {
    name: 'Paolo',
    surname: 'Russo',
    birth: new Date('1993-08-18'),
    role: 'centrocampista',
    team:''
  },
  {
    name: 'Alessandra',
    surname: 'Romano',
    birth: new Date('1989-04-05'),
    role: 'attaccante',
    team:''
  },
  {
    name: 'Simone',
    surname: 'Ferrari',
    birth: new Date('1996-11-30'),
    role: 'difensore',
    team:''
  },
  {
    name: 'Laura',
    surname: 'Esposito',
    birth: new Date('1984-02-22'),
    role: 'portiere',
    team:''
  },
  {
    name: 'Stefano',
    surname: 'Moretti',
    birth: new Date('1991-06-12'),
    role: 'portiere',
    team:''
  }, {
    name: 'Mario',
    surname: 'Rossi',
    birth: new Date('1990-05-15'),
    role: 'portiere',
    team:''
  },
  {
    name: 'Luigi',
    surname: 'Verdi',
    birth: new Date('1985-10-20'),
    role: 'difensore',
    team:''
  },
  {
    name: 'Giovanni',
    surname: 'Bianchi',
    birth: new Date('1998-03-08'),
    role: 'centrocampista',
    team:''
  },
  {
    name: 'Andrea',
    surname: 'Neri',
    birth: new Date('1982-12-03'),
    role: 'attaccante',
    team:''
  },
  {
    name: 'Francesco',
    surname: 'Gialli',
    birth: new Date('1995-07-25'),
    role: 'portiere',
    team:''
  },
  {
    name: 'Roberto',
    surname: 'Blu',
    birth: new Date('1987-09-12'),
    role: 'difensore',
    team:''
  }];
  const teams = await getTeams();
  try {
    for (const t of teams){
        for (const p of players){
            p.team=t.name
            const result = await firestore()
            .collection('Players')
            .add(p)
        }
    }
  } catch (error : any) {
    throw Error(error);
  }
}
