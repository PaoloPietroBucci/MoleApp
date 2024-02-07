import {Appearance, Dimensions, Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';


const mainColor = 'rgba(236, 30, 78, 0.95)';
const screenHeight = Dimensions.get('window').height;
const screenWidth =  Dimensions.get('window').width
const isTablet = DeviceInfo.isTablet();

export const styles = StyleSheet.create({
    
  mainLogo: {
    marginVertical: 20,
    resizeMode: 'contain',
    width: screenWidth * 0.8,
    height: screenHeight *0.9,
  },

  scrollContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  pageContainer: {
    height: screenHeight *0.85,
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center'
  },

  title: {
    fontSize: 50,
    margin:20,
    fontWeight: 'bold',
    color: mainColor,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 'auto',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
  },
  columnContainer: {
    margin:5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    width:'50%',
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
    width: screenWidth*0.2,
    height: screenHeight*0.1,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  tabletBigLogoContainer: {
    width:150,
    height:150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  smallLogoContainer: {
    marginHorizontal: 10,
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  error:{
    color:'red',
    textShadowColor: 'rgba(255, 0, 0, 0.8)',
    textShadowRadius: 5,
    fontWeight:'bold',
    fontSize:25 },

  navigationControlls:{
    marginBottom:20,
    height:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:screenWidth*0.8
  }
  
});
