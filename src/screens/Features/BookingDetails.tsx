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
        <ProfileHeader titile="Booking Details" width={18} />

        <View style={[styles.shadow, localStyles.bookingDetailsContainer]}>
          <View style={localStyles.imageContainer}>
            <Image
              source={{uri:Property.document_gallery[0].image}}
              style={localStyles.image}
              resizeMode="contain"
            />
          </View>
          <View style={localStyles.detailsContainer}>
            <View style={localStyles.detailsHeader}>
              <Text style={localStyles.bookingTitle}>{Property.name}</Text>
              <Text style={localStyles.bookingPrice}>price: {Property.amount}</Text>
            </View>
            <Text style={localStyles.bookingAddress}>{Property.address}</Text>
            <View style={localStyles.ratingContainer}>
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <Text style={localStyles.ratingText}>5.0</Text>
            </View>
          </View>
        </View>

        <View style={localStyles.totalContainer}>
          <Text style={localStyles.totalText}>Guest No</Text>
          <Text style={localStyles.totalAmount}>{selectedGuestCount}</Text>
        </View>
        <View style={localStyles.totalContainer}>
          <Text style={localStyles.totalText}>Total</Text>
          <Text style={localStyles.totalAmount}>{Property.amount*selectedGuestCount}</Text>
        </View>

        <View style={localStyles.contactHeader}>
          <Text style={localStyles.contactTitle}>Contact Details</Text>
          <Text style={localStyles.contactSubtitle}>
            We'll use this information to send you confirmation and updates about your booking
          </Text>
        </View>

        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder="First Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder="Last Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder="Email"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={localStyles.textInputContainer}>
          <TextInputField
            placeholder="Phone Number"
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
        <Text style={localStyles.nextButtonText}>NEXT</Text>
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
    width: '50%',
    justifyContent: 'space-around',
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
