import {getGroupMatchesByTeam} from '../firebase/matchApi';
import Match from '../model/Match';
import Team from '../model/Team';

export function calculateStat(group: Team[]): Team[] {
  console.log(group);
  group.forEach(async team => {
    var mathces: Match[] = await getGroupMatchesByTeam(team.name);
    team.points = 0;
    mathces.forEach(match => {
      if (match.team1 === team) {
        team.totalGoals = team.totalGoals! + match.goalTeam1;
        if (match.goalTeam1 > match.goalTeam2) {
          team.points += 3;
        } else if (match.goalTeam1 == match.goalTeam2) {
          team.points += 1;
        }
      }
      if (match.team2 === team) {
        team.totalGoals = team.totalGoals! + match.goalTeam2;
      }
      if (match.goalTeam2 > match.goalTeam1) {
        team.points = team.points + 3;
      } else if (match.goalTeam1 == match.goalTeam2) {
        team.points = team.points + 1;
      }
    });
  });

  group.sort(sortByPoint);

  return group;
}

function sortByPoint(team1: Team, team2: Team): number {
  if (team1.points > team2.points) {
    return 1;
  } else if (team1.points < team2.points) {
    return -1;
  } else team1.points == team2.points;
  return team1.name.localeCompare(team2.name);
}
