import { useState } from 'react';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Team from '../model/Team';

const TeamsScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <SafeAreaView>
      <Text> Teams</Text>
    </SafeAreaView>
  );
};

export default TeamsScreen;
