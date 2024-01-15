import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native';
import {styles} from '../styles';
import {ReactNode, useEffect, useState} from 'react';
import {getTenHighlights} from '../firebase/highlightApi';
import Highlight from '../model/Highlight';
import Video from 'react-native-video';

const NewsScreen = () => {
  const [highlights, setHighlights] = useState<Highlight[]>();

  useEffect(() => {
    const fetch = async () => {
      const firstTen = await getTenHighlights();
      setHighlights(firstTen);
    };
    fetch();
  }, []);

  const renderList = highlights?.map((media, index): ReactNode => {
    const video = media.urlReference.includes('mp4') || media.urlReference.includes('mp3')
    if (video){
    return (
      <View style={highlightStyles.videoContainer} key={index}>
        <Video
          source={{uri: media.urlReference}}
          controls={true}
          paused={true}
          style={highlightStyles.video}></Video>
        <Text style={highlightStyles.videoTitle}>{media.title}</Text>
      </View>
    )}
    else {
      return (<View style={highlightStyles.videoContainer} key={index}>
        <Image
          source={{uri: media.urlReference}}
          style={highlightStyles.video}></Image>
        <Text style={highlightStyles.videoTitle}>{media.title}</Text>
      </View>)
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Highlights</Text>
      {renderList}
    </ScrollView>
  );
};

const highlightStyles = StyleSheet.create({
  videoContainer: {
    display:'flex',
    flexDirection:'column',
  },
  video: {
    height:100,
    width:200
  },
  videoTitle: {
    fontSize:15,
    fontWeight:'600',
  },
});

export default NewsScreen;
