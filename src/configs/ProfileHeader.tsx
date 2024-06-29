import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RightArrow from '../assets/svg/RightArrow.svg';
import { useNavigation } from '@react-navigation/native';
import localizationStrings from '../utils/Localization';

export default function ProfileHeader({ title = '' }) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          // navigation.goBack();
        }}
        style={styles.backButton}>
        <RightArrow height={15} width={15} />
        <Text style={styles.backText}>
          {localizationStrings.Back}
        </Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop:Platform.OS == 'ios'?20:0,
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Adjust as needed
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  
    
  },
  backText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginLeft: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Federo-Regular',
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
});
