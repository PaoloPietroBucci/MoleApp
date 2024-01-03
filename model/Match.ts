import Team from "./Team";

export default interface Match{
    team1 : Team,
    team2 : Team,
    date : Date,
    goalTeam1 : number,
    goalTeam2 : number,
    penalties : boolean,
    penaltyGoalTeam1? : number,
    penaltyGoalTeam2? : number
}