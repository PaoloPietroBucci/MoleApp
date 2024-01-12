import { Dispatch } from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { styles } from "../styles";

const ImagePicker: React.FC<{
  photoURL: string;
  setPhotoURL: Dispatch<React.SetStateAction<string>>;
}> = ({ photoURL, setPhotoURL }) =>{

    const handleChooseImage = () => {
  
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        presentationStyle: 'popover',
        maxHeight: 2000,
        maxWidth: 2000,
      },  (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // Ottieni l'URI dell'immagine selezionata
          console.log(response.assets![0])
          setPhotoURL(response.assets![0].uri!);
        }
      })}
  
    return (

      <View>
        <TouchableOpacity onPress={handleChooseImage}>
        <Text style={{margin:20}}>Choose Image</Text>
        </TouchableOpacity>
        {photoURL && (
          <Image
            source={{ uri: photoURL }}
            style={{ width: 30, height: 30, marginTop: 10 }}
          />
        )}
      </View>
    );
  }

  export default ImagePicker