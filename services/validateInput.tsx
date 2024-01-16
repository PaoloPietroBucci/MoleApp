export function validateSignInForm(
  name: string,
  surname: string,
  email: string,
  password: string,
  dateOfBirth: Date | undefined,
): string{
  if (name === '') return 'Completare campo nome';
  if (surname === '') return 'Completare campo cognome';
  if (email === '') return 'Completare campo email';
  if (password === '') return 'Completare campo password';
  if (dateOfBirth === undefined) return 'Completare campo dateOfBirth';
  return 'valid'; // Nessun campo mancante
}
export function validateLogInForm(
  email: string,
  password: string,
): string{
  if (email === '') return 'Completare campo email';
  if (password === '') return 'Completare campo password';
  return 'valid'; // Nessun campo mancante
}

export function validateNewMatchForm(
  team1?: string,
  team2?: string,
  matchDate?: Date,
  round?: string,
  goalTeam1?: number,
  goalTeam2?: number,
  penalties?: boolean,
  penaltyGoaloalTeam1?: number,
  penaltyGoaloalTeam2?: number,
): string{
  if (matchDate === undefined) return 'Insert a valid date';
  if (team1 === team2) return 'Insert two valid teams';
  if (matchDate < new Date()){
    if(goalTeam1 === undefined || goalTeam2 === undefined){
      return 'Complete the score of the match'
    }
    if((goalTeam1 < 0) || goalTeam2 < 0 || isNaN(goalTeam1) || isNaN(goalTeam2)){
      return 'The score must be a number > 0'
    }
  }
  if(penalties === true){
    if(penaltyGoaloalTeam1 === undefined || penaltyGoaloalTeam2 === undefined){
      return 'Complete the score of the penalties'
    }
    if(penaltyGoaloalTeam1 < 0 || penaltyGoaloalTeam2 < 0 || isNaN(penaltyGoaloalTeam1) || isNaN(penaltyGoaloalTeam2) ){
      return 'The score must be a number > 0'
    }
  }
  if(round !== 'group' && matchDate < new Date()){
    if(goalTeam1 === goalTeam2 && penalties === false){
      return 'Probably you need to insert also the penalty goals'
    }
  }
  return 'valid'; // Nessun campo mancante
}



