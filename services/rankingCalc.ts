import { getGroupMatchesByTeam } from '../firebase/matchApi';
import Match from '../model/Match';
import Team from '../model/Team';

export async function calculateStat(group: Team[]): Promise<Team[]> {
  for (const team of group) {
    const matches: Match[] = await getGroupMatchesByTeam(team.name);
    
    for (const match of matches) {
      if (match.team1 === team.name) {
        team.totalGoals = (team.totalGoals || 0) + match.goalTeam1;

        if (match.goalTeam1 > match.goalTeam2) {
          team.points += 3;
        } else if (match.goalTeam1 === match.goalTeam2) {
          team.points += 1;
        }
      }

      if (match.team2 === team.name) {
        team.totalGoals = (team.totalGoals || 0) + match.goalTeam2;

        if (match.goalTeam2 > match.goalTeam1) {
          team.points += 3;
        } else if (match.goalTeam1 === match.goalTeam2) {
          team.points += 1;
        }
      }
    }
  }

  group.sort(sortByPoint);

  return group;
}

function sortByPoint(team1: Team, team2: Team): number {
  if (team1.points > team2.points) {
    return -1;
  } else if (team1.points < team2.points) {
    return +1;
  } else {
    return team1.name.localeCompare(team2.name);
  }
}
