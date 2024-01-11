function validateLogInForm(
  name: string,
  surname: string,
  email: string,
  password: string,
  photoURL: string,
  dateOfBirth: Date,
): string | void {
  if (name === undefined) return 'Completare campo nome';
  if (surname === undefined) return 'Completare campo cognome';
  if (email === undefined) return 'Completare campo email';
  if (password === undefined) return 'Completare campo password';
  if (dateOfBirth === undefined) return 'Completare campo dateOfBirth';
  return; // Nessun campo mancante
}
