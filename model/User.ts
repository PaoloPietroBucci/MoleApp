export default interface User{
    name : string,
    surname : string,
    email : string,
    password : string,
    photoURL : string,
    dateOfBirth: Date | {nanoseconds: number, seconds: number}
}