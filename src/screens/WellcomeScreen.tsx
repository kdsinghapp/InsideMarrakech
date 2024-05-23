import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export default function WellcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/Cropping/Welcome.png')}
        style={styles.imageBackground}
        resizeMode='stretch'
      >
      </ImageBackground>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Inside Marrakech</Text>
        <Text style={styles.subtitle}>The biggest fashion community for inspiration and shopping.</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageBackground: {
    height: hp(65),
    width: '100%',
    marginTop: -28,
  },
  textContainer: {
    marginTop: 20,
    height: hp(10),
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Federo-Regular',
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#121416',
    height: 60,
    marginHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '94%',
  },
  buttonText: {
    fontFamily: 'Federo-Regular',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
