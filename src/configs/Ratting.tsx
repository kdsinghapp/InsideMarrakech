import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Rating = ({ rating, onRatingChange }) => {
  const maxRating = 5;
  const goldStar = require('../assets/Cropping/Vector.png');
  const greyStar = require('../assets/Star2x.png');

  return (
    <View style={styles.ratingContainer}>
      {Array.from({ length: maxRating }, (_, index) => (
        <TouchableOpacity
        style={{height:30,width:30}}
          key={index}
          onPress={() => onRatingChange(index + 1)}
          activeOpacity={0.7}
        >
          <Image
            source={index < rating ? goldStar : greyStar}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
  },
});

export default Rating;
