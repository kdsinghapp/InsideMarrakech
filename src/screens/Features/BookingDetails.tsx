import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import { styles } from '../../configs/Styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation, useRoute } from '@react-navigation/native';
import { errorToast } from '../../configs/customToast';

import { useSelector } from 'react-redux';
import Rating from '../../configs/Ratting';
import localizationStrings from '../../utils/Localization';

export default function BookingDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate,Property,
    selectedGuestCount } = route.params;

  // State variables for text input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const propertDetails = useSelector(state => state.feature.propertyDetail);

  const CheckInputData =()=>{

    if (
      firstName === '' &&
      lastName === '' &&
      phoneNumber === '' &&
      email === '' 
    ) return errorToast('Please enter all fields error');
    navigation.navigate(ScreenNameEnum.TRAVELER_DETAILS, {
      firstName,
      lastName,
      email,
      phoneNumber,
      selectedDate,
      selectedGuestCount,
      Property
    });
  }
  


  return (
    <View style={localStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title={localizationStrings.Booking_details} width={12} />

        <View style={[styles.shadow, localStyles.bookingDetailsContainer]}>
          <View style={localStyles.imageContainer}>
            <Image
              source={{uri:Property.main_image}}
              style={localStyles.image}
              resizeMode="cover"
            />
          </View>
          <View style={localStyles.detailsContainer}>
            <View style={localStyles.detailsHeader}>
              <Text style={localStyles.bookingTitle}>{Property.name}</Text>
              <Text style={localStyles.bookingPrice}>price: {Property.amount}</Text>
            </View>
            <Text style={localStyles.bookingAddress}>{Property.address}</Text>
            <View style={localStyles.ratingContainer}>
            <Rating rating={propertDetails?.rating} /> 
              <Text style={localStyles.ratingText}>{propertDetails?.rating}</Text>
            </View>
          </View>
        </View>

        <View style={localStyles.totalContainer}>
          <Text style={localStyles.totalText}>{localizationStrings.G_no}</Text>
          <Text style={localStyles.totalAmount}>{selectedGuestCount}</Text>
        </View>
        <View style={localStyles.totalContainer}>
          <Text style={localStyles.totalText}>{localizationStrings.total}</Text>
          <Text style={localStyles.totalAmount}>{Property.amount*selectedGuestCount}</Text>
        </View>

        <View style={localStyles.contactHeader}>
          <Text style={localStyles.contactTitle}>{localizationStrings.Contact_d}</Text>
          <Text style={localStyles.contactSubtitle}>
          {localizationStrings.C_txt}
          </Text>
        </View>

        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder={localizationStrings.First_name}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder={localizationStrings.Last_Name}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder={localizationStrings.email}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder={localizationStrings.Mobile_number}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            
          />
        </View>
        <TouchableOpacity
        onPress={() => {
         CheckInputData()
        }}
        style={[styles.tabBtn, localStyles.nextButton]}>
        <Text style={localStyles.nextButtonText}>{localizationStrings.next}</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  bookingDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(12),
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  imageContainer: {
    marginLeft: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius:10
  },
  detailsContainer: {
    marginLeft: 10,
    width: '72%',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  bookingPrice: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  bookingAddress: {
    fontFamily: 'Federo-Regular',
    marginTop: 10,
    color: '#777777',
    fontSize: 12,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginLeft: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  totalText: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  totalAmount: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  contactHeader: {
    marginTop: 20,
  },
  contactTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  contactSubtitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    color: '#777777',
    fontWeight: '500',
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#000',
   
  },
  nextButtonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: 'Federo-Regular',
  },
});

const Styles = StyleSheet.create({
  txtInput: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
  },
});
