import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const FullscreenImageScreen = ({ route, navigation }) => {
  const { images } = route.params;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(previousIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/Cropping/Close2x.png')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <Image source={{ uri: images[currentIndex].image }} style={styles.image} resizeMode="contain" />
      <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
        <Image source={require('../../assets/Cropping/left-arrow.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Image source={require('../../assets/Cropping/right-arrow.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  previousButton: {
    position: 'absolute',
    top: screenHeight / 2 - 15,
    left: 20,
    zIndex: 1,
  },
  nextButton: {
    position: 'absolute',
    top: screenHeight / 2 - 15,
    right: 20,
    zIndex: 1,
  },
});

export default FullscreenImageScreen;
