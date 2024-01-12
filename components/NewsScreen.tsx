import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
  });

  const renderList = highlights?.map((video, index): ReactNode => {
    return (
      <View style={highlightStyles.videoContainer} key={index}>
        <Video
          source={{uri: video.urlReference}}
          style={highlightStyles.video}></Video>
        <Text style={highlightStyles.videoTitle}>{video.title}</Text>
      </View>
    );
  });


  return <ScrollView style={styles.pageContainer}>
    <Text style={styles.title}>Highlights</Text>
    {renderList}
    </ScrollView>;
};

const highlightStyles = StyleSheet.create({
  videoContainer: {},
  video: {},
  videoTitle: {},
});

export default NewsScreen;
