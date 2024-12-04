import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation, useRoute } from '@react-navigation/native';
import AddPlus from '../../assets/svg/Add.svg';
import Box from '../../assets/svg/checkBox.svg';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { add_booking } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import Rating from '../../configs/Ratting';
import localizationStrings from '../../utils/Localization';
import { TextInputMask } from 'react-native-masked-text';
import { RadioButton } from 'react-native-paper';
import WebView from 'react-native-webview';
import { errorToast } from '../../configs/customToast';
import ExitConfirmationModal from '../../configs/ExitConfirmationModal';
export default function PaymentDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPayment, setselectedPayment] = useState('Cash on Delivery');
  const [PaymentMode, setPaymentMode] = useState('Paid')
  const [PaymentStatus, setPaymentStatus] = useState('unpaid')
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const navigation = useNavigation();

  const propertDetails = useSelector(state => state.feature.propertyDetail);
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const [checkoutUrl, setCheckoutUrl] = useState(false);
  const [isLoading2, setIsLoading] = useState(false);
  const route = useRoute();
  const {
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
    Property,
  } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const handleItemSelect = index => {
    setSelectedItemIndex(index);
  };
  const dispatch = useDispatch();


  const get_paypal_url = (data) => {


    const formdata = new FormData();
    formdata.append("currency", "EUR");
    formdata.append("amount", Number(Property.amount * selectedGuestCount));
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    
    fetch("https://inside-marrakech.com/api/paypal/create-order", requestOptions)
      .then((response) => response.text())
      .then((result) => {
 const res = JSON.parse(result)
        console.log(res?.url)
if(res?.url){

  navigation.navigate(ScreenNameEnum.WebViewScreen, { url: res?.url, fromData: data })
}

      })
      .catch((error) => console.error(error));
  }
  const booking_id = uuid.v4();
  const Payment_mode = () => {

    const payment_uri = `https://inside-marrakech.com/admin/booking_payment?user_id=${user.id}&amount=${(Number(Property.amount) * Number(selectedGuestCount))?.toFixed(2)}&currency=mad&booking_id=${booking_id}`
    const price = Property.amount * selectedGuestCount


    const fromData = {
      user_id: user.id,
      company_id: Property.company_id,
      property_id: Property.id,
      first_name: firstName,
      last_name: lastName,
      mobile: phoneNumber,
      driver_id: '',
      language: language,
      address: address,
      lat: '',
      lon: '',
      amount: price,
      GuestList: travelers,
      created_date: selectedEndDate ? selectedStartDate + ' To ' + selectedEndDate : selectedStartDate,
      email: email,
    }





    if (PaymentMode == 'Paid') {
      get_paypal_url(fromData)
    

    } else {
      submitBooking()
    }
  }

  // const payment_uri = `https://server-php-8-2.technorizen.com/inside/admin/booking_payment?user_id=${user.id}&amount=${Property.amount * selectedGuestCount}&currency=mad&booking_id=${booking_id}`



  const submitBooking = () => {
    const price = Property.amount * selectedGuestCount

    const params = {
      data: {
        user_id: user.id,
        company_id: Property.company_id,
        property_id: Property.id,
        first_name: firstName,
        last_name: lastName,
        mobile: phoneNumber,
        driver_id: '',
        language: language,
        address: address,
        lat: '',
        lon: '',
        amount: price,
        GuestList: travelers,
        created_date: selectedEndDate ? selectedStartDate + ' To ' + selectedEndDate : selectedStartDate,
        email: email,
      },


      navigation: navigation,
    };
    dispatch(add_booking(params));
  };

  const handleNavigationStateChange = async (navState) => {


    if (navState.url.includes('paystripedata_booking')) {
      setCheckoutUrl(false);
      Alert.alert('Payment Success', 'Your payment was successful!');
      setPaymentStatus('paid')
      await submitBooking();

    }

  };
  const handleError = (error) => {
    console.error('WebView Error:', error);
    Alert.alert('Error', 'Failed to load payment page. Please try again later.');
    setCheckoutUrl(false);
    setPaymentStatus('unpaid')
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {checkoutUrl ? (
        <WebView
          source={{ uri: payment_uri }}
          onNavigationStateChange={handleNavigationStateChange}

          onError={handleError}
          style={{ marginTop: 40 }}
        />
      ) : <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileHeader title={localizationStrings.P_details} width={18} />

          <View style={styles.bookingContainer}>
            <View style={styles.bookingImageContainer}>
              <Image
                source={{ uri: Property.main_image }}
                style={styles.bookingImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.bookingDetails}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingTitle}>{Property.name}</Text>
                <Text style={styles.bookingPrice}>{Property.amount}</Text>
              </View>
              <Text style={styles.bookingAddress}>{Property.address}</Text>
              <View style={styles.ratingContainer}>
                <Rating rating={propertDetails?.rating} />
                <Text style={styles.ratingText}>{propertDetails?.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{localizationStrings.G_no} {selectedGuestCount}</Text>

          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{localizationStrings.B_date}</Text>
            <Text style={styles.totalText}>{selectedStartDate} {selectedEndDate ? ' To ' + selectedEndDate : ''}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{localizationStrings.total}</Text>
            {totalDays != 0 && <Text style={styles.totalAmount}>
              {Property.amount * selectedGuestCount * totalDays}
            </Text>}
            {totalDays == 0 && <Text style={styles.totalAmount}>
              {Property.amount * selectedGuestCount}
            </Text>}
          </View>

          <View style={styles.paymentTitleContainer}>
            <Text style={styles.paymentTitle}>{localizationStrings.P_details}</Text>
          </View>
          <View
            style={[
              styles.shadow,
              {
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                marginHorizontal: 5
              },
            ]}>
            <FlatList
              scrollEnabled={false}
              data={PaymentOption}
              renderItem={({ item, index }) => (
                <TouchableOpacity

                  onPress={() => {
                    setselectedPayment(item.name)
                    setPaymentMode(item.mode)
                  }}
                  style={{
                    height: 36,
                    borderRadius: 8,
                    marginTop: 10,

                    paddingHorizontal: 10,
                    backgroundColor: selectedPayment == item.name ? '#c9f5d4' : '#F5F5F5',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Image
                      source={item.logo}
                      style={{ height: 20, width: 20, marginRight: 10 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '82%',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,

                          color: '#606060',
                          fontWeight: '500',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <RadioButton
                      value={item.id}
                      status={item.name == selectedPayment ? 'checked' : 'unchecked'}


                    />
                  </View>
                </TouchableOpacity>
              )}

            />
          </View>




          <View style={{ height: hp(5) }} />
        </ScrollView>
        <ExitConfirmationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <TouchableOpacity
          onPress={() => {
            Payment_mode()

          }}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{localizationStrings.P_now}</Text>
        </TouchableOpacity>
      </>}

    </View>
  );
}
const PaymentOption = [
  // {
  //   id: 1,

  //   name: 'Card',
  //   logo: require('../../assets/croping/Wallet3x.png'),
  // },
  {
    id: 1,

    name: 'Card or Online Payment',
    logo: require('../../assets/Cropping/Wallet3x.png'),
    mode: 'Paid'
  },
  // {
  //   id: 2,
  //   mode: 'Cash',
  //   name: 'Cash on Delivery',
  //   logo: require('../../assets/Cropping/CashonDelivery3x.png'),
  // },
];
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#6D6EEC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(12),
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingImageContainer: {
    marginLeft: 10,
  },
  bookingImage: {
    height: 80,
    borderRadius: 10,
    width: 80,
  },
  bookingDetails: {
    marginLeft: 10,
    width: '72%',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
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
  paymentTitleContainer: {
    height: hp(6),
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  paymentTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  creditDebitTitleContainer: {
    height: hp(6),
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  creditDebitTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  cardListContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,

    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardItem: {
    height: 36,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCardItem: {
    backgroundColor: '#D3D3D3',
  },
  cardLogo: {
    height: 20,
    width: 32,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  cardName: {
    fontSize: 12,
    lineHeight: 15.18,
    color: '#606060',
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  cardNumber: {
    fontSize: 12,
    lineHeight: 15.18,
    color: '#606060',
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  addCardContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  addCardIconContainer: {
    height: 35,
    width: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardTextContainer: {
    width: '80%',
    justifyContent: 'center',
    marginLeft: 10,
  },
  addCardText: {
    color: '#606060',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Federo-Regular',
    fontWeight: '400',
  },
  inputContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5,
    fontWeight: '500',
    fontFamily: 'Federo-Regular',
    color: '#000000',
  },
  inputFieldContainer: {
    height: 50,
    backgroundColor: '#F8F8F8',
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Federo-Regular',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 5,
  },
  inputColumn: {
    width: '40%',
    paddingHorizontal: 10,
  },
  smallInputFieldContainer: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginTop: 10,
    borderRadius: 12,
  },
  cvvContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cvvInput: {
    width: '60%',
  },
  cvvIcon: {
    height: 20,
    width: 20,
  },
  nextButton: {
    backgroundColor: '#000',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center'
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
  // modalContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   width: '90%',
  //   height: hp(60),
  //   padding: 10,
  // },


  driverItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: hp(10),
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  driverImage: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  driverDetails: {
    marginLeft: 10,
    width: '75%',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  driverInfo: {
    fontSize: 12,
    fontWeight: '500',
    color: '#777777',
  },
  unselectedCheckbox: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderWidth: 2,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBtn: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(7),
    marginHorizontal: 10,
    marginVertical: 15,
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
const card = [
  {
    cardNo: '**** **** **** 8395',
    name: 'Axis Bank',
    logo: require('../../assets/Cropping/master.png'),
  },
  {
    cardNo: '**** **** **** 6246',
    name: 'HDFC Bank',
    logo: require('../../assets/Cropping/visa.png'),
  },
];
