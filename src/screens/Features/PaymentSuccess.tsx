import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ProfileHeader from '../../configs/ProfileHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { styles } from '../../configs/Styles'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../../routes/screenName.enum'
import localizationStrings from '../../utils/Localization'

export default function PaymentSuccess() {
  const navigation = useNavigation()
  
  return (
    <View style={localStyles.container}>
      <View style={localStyles.header}>
        <Text style={localStyles.headerText}>SuccessFully</Text>
      </View>
      
      <View style={localStyles.imageContainer}>
        <Image
          source={require('../../assets/Cropping/I_1a3x.png')}
          style={localStyles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={localStyles.confirmationContainer}>
        <Text style={localStyles.confirmationText}>{localizationStrings.Y_B_C} 🎉</Text>
        <Text style={localStyles.descriptionText}>Lorem ipsum dolor sit amet consectetur. Semper odio nullam neque</Text>
        <Text style={localStyles.descriptionText}>lacus sit egestas.</Text>
      </View>
      
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        }}
        style={localStyles.button}>
        <Text style={localStyles.buttonText}>{localizationStrings.b_home}</Text>
      </TouchableOpacity>
    </View>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
    marginTop: 40,
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'Federo-Regular',
    fontSize: 22,
    fontWeight: '600',
    color: '#000'
  },
  imageContainer: {
    height: hp(40),
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '90%',
    width: '90%'
  },
  confirmationContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 0
  },
  confirmationText: {
    fontFamily: 'Federo-Regular',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  descriptionText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#777777',
    marginTop: 15
  },
  button: {
    backgroundColor: '#000',
    bottom: 20,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 30
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Federo-Regular',
  }
});
