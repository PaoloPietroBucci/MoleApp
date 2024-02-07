import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const matchStyles = StyleSheet.create({
    matchContainer: {
      height: 120,
      width: screenWidth * 0.8,
      marginVertical: 10,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1,
    },
  
    tabletMatchContainer: {
      height: 120,
      width: screenWidth * 0.6,
      marginVertical: 10,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1,
    },
  
    teamsContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom:20
    },
  
    leftTeamBox: {
      height:25,
      display: 'flex',
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    rightTeamBox: {
      height:25,
      display: 'flex',
      flex: 3,
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    teamName: {
      height:25,
      fontWeight: '600',
      fontSize: 18,
    },
    separator: {
      height:25,
      display:"flex",
      justifyContent:'center',
      alignItems:'center',
      flex: 1,
    },
    date: {
      color: 'rgba(236, 30, 78, 0.95)',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 20,
    },
  });

  export default matchStyles