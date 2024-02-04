

export default interface Match{
    team1 : string,
    team2 : string,
    date : Date,
    round: string,
    goalTeam1? : number | null,
    goalTeam2? : number | null,
    penalties : boolean,
    penaltyGoalTeam1? : number | null,
    penaltyGoalTeam2? : number | null

    toString(): string;
}




