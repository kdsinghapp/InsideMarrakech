import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useNavigation, useRoute} from '@react-navigation/native';
import Pin from '../../assets/svg/BlackPin.svg';
import Box from '../../assets/svg/checkBox.svg';
import Rating from '../../configs/Ratting';
import { useSelector } from 'react-redux';
import localizationStrings from '../../utils/Localization';
import GooglePlacesInput from '../../configs/AutoAddress';

export default function AddTravelerDetails() {
  const route = useRoute();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    selectedStartDate,
      selectedEndDate, totalDays,
    selectedGuestCount,
    Property
  } = route.params;

  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [DriverDetails, setDriverDetails] = useState(null);
  const [address,setAddress] =useState('')
  const [language,setLanguage] =useState('')
  const navigation = useNavigation();
  const propertDetails = useSelector(state => state.feature.propertyDetail);

  // State variable to manage the number of travelers
  const [travelerCount, setTravelerCount] = useState(selectedGuestCount);
  const [travelers, setTravelers] = useState(
    Array.from({length: travelerCount}, () => ({firstName: '', lastName: ''})),
  );

  // Update traveler details
  const handleInputChange = (index, field, value) => {
    const newTravelers = [...travelers];
    newTravelers[index][field] = value;
    setTravelers(newTravelers);
  };

  const handleNext = () => {
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      travelers,
      language,
      address,
      selectedStartDate,
      selectedEndDate, totalDays,
      selectedGuestCount,
      Property
    };
    navigation.navigate(ScreenNameEnum.PAYMENT_DETAILS, data);
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title={localizationStrings.Booking_details} width={13} />

        <View style={[styles.shadow, styles.bookingDetails]}>
          <View style={styles.imageContainer}>
            <Image
               source={{uri:Property.main_image}}
              style={styles.bookingImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.bookingInfo}>
            <View style={styles.bookingTitleContainer}>
              <Text style={styles.bookingTitle}>{Property.name}</Text>
              <Text style={styles.bookingTitle}>{Property.amount}</Text>
            </View>
            <Text style={styles.bookingAddress}>
            {Property.address}
            </Text>
            <View style={styles.ratingContainer}>
            <Rating rating={propertDetails?.rating} /> 
              <Text style={styles.ratingText}>{propertDetails?.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{localizationStrings.total}</Text>
         {totalDays != 0 && <Text style={styles.totalText}>{Property.amount*selectedGuestCount*totalDays}</Text>}
         {totalDays == 0 && <Text style={styles.totalText}>{Property.amount*selectedGuestCount}</Text>}
       
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{localizationStrings.B_date}</Text>
          <Text style={styles.totalText}>{selectedStartDate} {selectedEndDate?' To '+selectedEndDate:''}</Text>
        </View>
        

        {travelers.map((traveler, index) => (
          <View key={index} style={styles.travelerSection}>
            <Text style={styles.travelerTitle}>{`${localizationStrings.traveler} ${
              index + 1
            } (${localizationStrings.adults})`}</Text>
            <View style={[styles.txtInput, styles.inputMargin]}>
              <TextInputField
                placeholder={localizationStrings.First_name}
                firstLogo={false}
                img={require('../../assets/Cropping/Lock3x.png')}
                showEye={false}
                value={traveler.firstName}
                onChangeText={text =>
                  handleInputChange(index, 'firstName', text)
                }
              />
            </View>
            <View style={[styles.txtInput, styles.inputMargin]}>
              <TextInputField
                placeholder={localizationStrings.Last_Name}
                firstLogo={false}
                img={require('../../assets/Cropping/Lock3x.png')}
                showEye={false}
                value={traveler.lastName}
                onChangeText={text =>
                  handleInputChange(index, 'lastName', text)
                }
              />
            </View>
          
          </View>
        ))}
        <View style={[styles.txtInput, styles.inputMargin]}>
          <TextInputField
            placeholder={localizationStrings.language}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={language}
            onChangeText={text =>
              setLanguage(text)
            }
          />
        </View>
        <View style={[styles.txtInput, styles.inputContainer]}>
          <Pin />
          <TextInputField
            placeholder={localizationStrings.address}
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
            value={address}
            onChangeText={text =>
              setAddress(text)
            }
          />
        </View>

      

       

        <View style={styles.bottomSpacer} />

      <TouchableOpacity
          onPress={() => {
            handleNext();
          }}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacer} />
      </ScrollView>
     
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(12),
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  imageContainer: {
    marginLeft: 10,
  },
  bookingImage: {
    height: 80,
    width: 80,
    borderRadius:10
  },
  bookingInfo: {
    marginLeft: 10,
    width: '72%',
  },
  bookingTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingTitle: {
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
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  selectDriverButton: {
    height: 45,
    backgroundColor: '#777777',
    marginTop: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectDriverButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  driverTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginHorizontal: 10,
    marginTop: 20,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: hp(10),
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  driverImage: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  driverDetails: {
    marginLeft: 10,
    width: '85%',
  },
  driverName: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  driverDetailsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777777',
  },
  travelerSection: {
    marginTop: 20,
  },
  travelerTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  txtInput: {
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
  },
  inputMargin: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingRight: 10,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingRight: 10,
  },
  nextButton: {
    backgroundColor: '#000',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    alignSelf:'center',
  
  },
  nextButtonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: 'Federo-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: hp(60),
    padding: 10,
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp(5),
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 36,
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  driverListItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: hp(10),
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  driverListItemImage: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  driverListItemDetails: {
    marginLeft: 10,
    width: '75%',
  },
  driverListItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  driverListItemInfo: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777777',
    fontFamily: 'Federo-Regular',
  },
  unselectedCheckbox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderWidth: 2,
  },
  bottomSpacer: {
    height: hp(5),
  },
});
const Driver = [
  {
    name: 'Nolan Rhiel Madsen',
    Details: 'Johan Smihs',
    img: require('../../assets/Cropping/dp1.png'),
  },
  {
    name: 'Anika Septimus',
    Details: 'Johan Smihs',
    img: require('../../assets/Cropping/dp2.png'),
  },
];
