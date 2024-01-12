import {Dimensions, Platform, StyleSheet} from 'react-native';

const mainColor = 'rgba(236, 30, 78, 0.95)';
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
  mainLogo: {
    height: 30,
    width: 'auto',
  },

  pageContainer: {
    height:'90%',
    marginVertical: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'space-around',
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: mainColor,
  },
  input: {
    width: 250,
    height: 'auto',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
  },
  columnContainer: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowContainer: {
    width:'70%',
    marginVertical: 15,
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    margin: 20,
    backgroundColor: mainColor,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      }})
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  bigLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  smallLogoContainer: {
    marginHorizontal: 2,
    marginVertical: 2,
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: '80%',
    height: '70%',
    borderRadius: 20,
  },
  error:{
    color:'red',
    fontWeight:'bold',
    fontSize:15
  }
});
