import firestore from '@react-native-firebase/firestore';
import Player from '../model/Player';
import { getTeams } from './firebase/teamApi';

export async function addPlayersByTeam(selectedTeam){
  var players = [  {
    Nome: 'Paolo',
    Cognome: 'Russo',
    BirthDate: new Date('1993-08-18'),
    Role: 'centrocampista',
  },
  {
    Nome: 'Alessandra',
    Cognome: 'Romano',
    BirthDate: new Date('1989-04-05'),
    Role: 'attaccante',
  },
  {
    Nome: 'Simone',
    Cognome: 'Ferrari',
    BirthDate: new Date('1996-11-30'),
    Role: 'difensore',
  },
  {
    Nome: 'Laura',
    Cognome: 'Esposito',
    BirthDate: new Date('1984-02-22'),
    Role: 'portiere',
  },
  {
    Nome: 'Stefano',
    Cognome: 'Moretti',
    BirthDate: new Date('1991-06-12'),
    Role: 'portiere',
  }, {
    Nome: 'Mario',
    Cognome: 'Rossi',
    BirthDate: new Date('1990-05-15'),
    Role: 'portiere',
  },
  {
    Nome: 'Luigi',
    Cognome: 'Verdi',
    BirthDate: new Date('1985-10-20'),
    Role: 'difensore',
  },
  {
    Nome: 'Giovanni',
    Cognome: 'Bianchi',
    BirthDate: new Date('1998-03-08'),
    Role: 'centrocampista',
  },
  {
    Nome: 'Andrea',
    Cognome: 'Neri',
    BirthDate: new Date('1982-12-03'),
    Role: 'attaccante',
  },
  {
    Nome: 'Francesco',
    Cognome: 'Gialli',
    BirthDate: new Date('1995-07-25'),
    Role: 'portiere',
  },
  {
    Nome: 'Roberto',
    Cognome: 'Blu',
    BirthDate: new Date('1987-09-12'),
    Role: 'difensore',
  }];
  const teams = getTeams();
  try {
    for (const t of teams){
        for (const p of players){
            p[team]=t.name
            const result = await firestore()
            .collection('Players')
            .add(p)
        }
    }
  } catch (error) {
    throw Error(error);
  }
}
