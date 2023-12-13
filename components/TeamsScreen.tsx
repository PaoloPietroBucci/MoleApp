import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const TeamsScreen = () => {
  const elements = [];

  for (let i = 0; i < 10; i++) {
    elements.push(<Text key={i}>Team {i + 1}</Text>);
  }

  return (
    <SafeAreaView>
      <Text> Teams</Text>
      <View>{elements}</View>
    </SafeAreaView>
  );
};

export default TeamsScreen;
