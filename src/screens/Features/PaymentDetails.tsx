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
} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useNavigation, useRoute} from '@react-navigation/native';
import AddPlus from '../../assets/svg/Add.svg';
import Box from '../../assets/svg/checkBox.svg';
import {RadioButton} from 'react-native-radio-buttons-group';
import {useDispatch, useSelector} from 'react-redux';
import { add_booking } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function PaymentDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [DriverDetails, setDriverDetails] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [validMonth, setValidMonth] = useState('');
  const [validYear, setValidYear] = useState('');
  const [cvv, setCvv] = useState('');
  const navigation = useNavigation();
  const [cardHolderName, setCardHolderName] = useState('');

  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  console.log('====================================');
  console.log(user.id);
  console.log('====================================');
  const route = useRoute();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    travelers,
    language,
    address,
    selectedDate,
    selectedGuestCount,
    Property
  } = route.params;

  console.log('====================================');
  console.log(
    firstName,
    ',',
    lastName,
    ',',
    email,
    ',',
    phoneNumber,
    ',',
    travelers,
    ',',
    language,
    ',',
    address,
    ',',
    selectedDate,
    ',',
    selectedGuestCount,
  );
  console.log('====================================');

  const handleItemSelect = index => {
    setSelectedItemIndex(index);
  };
const dispatch= useDispatch()
  const submitBooking = () => {
    const params = {
      data:{
      user_id: user.id,
      property_id: Property.id,
      first_name: firstName,
      last_name: lastName,
      mobile: phoneNumber,
      driver_id: '',
      language: language,
      address: address,
      lat: '',
      lon: '',
      amount: '150',
      GuestList: travelers,
      created_date: selectedDate,
      email: email,
      },
      navigation:navigation
    };
    dispatch(add_booking(params))
  };

  return (
    <View style={styles.container}>
      {isLoading ?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Booking Details" width={18} />

        <View style={styles.bookingContainer}>
          <View style={styles.bookingImageContainer}>
            <Image
                  source={{uri:Property.document_gallery[0].image}}
              style={styles.bookingImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.bookingDetails}>
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingTitle}>{Property.name}</Text>
              <Text style={styles.bookingPrice}>$ {Property.amount}</Text>
            </View>
            <Text style={styles.bookingAddress}>
              {Property.address}
            </Text>
            <View style={styles.ratingContainer}>
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>$ {Property.amount*selectedGuestCount}</Text>
        </View>

        <View style={styles.paymentTitleContainer}>
          <Text style={styles.paymentTitle}>Payment Details</Text>
        </View>
        <View style={styles.creditDebitTitleContainer}>
          <Text style={styles.creditDebitTitle}>Select Credit & Debit Cards</Text>
        </View>
        <View style={styles.cardListContainer}>
          <FlatList
            scrollEnabled={false}
            data={card}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleItemSelect(index)}
                style={[
                  styles.cardItem,
                  selectedItemIndex === index && styles.selectedCardItem,
                ]}>
                <View>
                  <Image
                    source={item.logo}
                    style={styles.cardLogo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardNumber}>{item.cardNo}</Text>
                </View>
                {selectedItemIndex === index && (
                  <RadioButton
                    selected={true}
                    onPress={() => {}}
                    color="#6D6EEC"
                    borderSize={1}
                    size={20}
                    borderColor="#6D6EEC"
                  />
                )}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.addCardContainer}>
            <View style={styles.addCardIconContainer}>
              <AddPlus />
            </View>
            <View style={styles.addCardTextContainer}>
              <Text style={styles.addCardText}>Add New Card</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Card Number</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              placeholder="Enter 12 digit card number"
              placeholderTextColor={'#979797'}
              style={styles.inputField}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.inputLabel}>Valid Thru</Text>
              <View style={styles.smallInputFieldContainer}>
                <TextInput
                  placeholder="Month"
                  style={styles.inputField}
                  value={validMonth}
                  onChangeText={setValidMonth}
                />
              </View>
              <Text style={styles.inputLabel}>Ex year</Text>
              <View style={styles.smallInputFieldContainer}>
                <TextInput
                  placeholder="Year"
                  style={styles.inputField}
                  value={validYear}
                  onChangeText={setValidYear}
                />
              </View>
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.inputLabel}>CVV</Text>
              <View style={styles.cvvContainer}>
                <TextInput
                  placeholder="CVV"
                  style={styles.cvvInput}
                  value={cvv}
                  onChangeText={setCvv}
                />
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Cropping/eyes4.png')}
                    style={styles.cvvIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.inputLabel}>Card Holder’s Name</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              placeholder="Name on Card"
              placeholderTextColor={'#979797'}
              style={styles.inputField}
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            submitBooking();
            // navigation.navigate(ScreenNameEnum.PAYMENT_SUCCESS);
          }}
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Driver</Text>
              </View>
              <FlatList
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelection(true);
                      setSelectedIndex(index);
                      setIsVisible(false);
                      setDriverDetails(item);
                    }}
                    style={styles.driverItem}>
                    <Image source={item.img} style={styles.driverImage} />
                    <View style={styles.driverDetails}>
                      <Text style={styles.driverName}>{item.name}</Text>
                      <Text style={styles.driverInfo}>{item.Details}</Text>
                    </View>
                    {isSelected && index !== selectedIndex && (
                      <View style={styles.unselectedCheckbox}></View>
                    )}
                    {isSelected && index === selectedIndex && (
                      <Box height={20} width={20} />
                    )}
                  </TouchableOpacity>
                )}
                data={Driver}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={{height: hp(5)}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
borderRadius:10,
    width: 80,
  },
  bookingDetails: {
    marginLeft: 10,
    width: '72%',
  },
  bookingHeader: {
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
    marginTop: 20,
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
  },
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
    shadowOffset: {width: 0, height: 2},
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
