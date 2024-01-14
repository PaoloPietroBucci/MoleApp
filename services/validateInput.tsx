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


