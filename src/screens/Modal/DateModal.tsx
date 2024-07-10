import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import ScreenNameEnum from '../../routes/screenName.enum';
import { errorToast } from '../../configs/customToast';
import localizationStrings from '../../utils/Localization';

const DateModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const navigation = useNavigation();

  const generateGuests = (min, max) => {
    const guests = [];
    for (let i = min; i <= max; i++) {
      guests.push({ count: i.toString() });
    }
    return guests;
  };

  const Guests = generateGuests(data?.no_of_guest_min || 1, data?.no_of_guest_max || 7);

  const calculateTotalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'days') + 1;
  };
  
  const handleNext = () => {
    // if (!selectedStartDate || (data.cat_id === '23' && !selectedEndDate) || selectedGuestCount === null) {
    //   errorToast('All fields are required.');
    //   return;
    // }

    const totalDays = calculateTotalDays(selectedStartDate, selectedEndDate);

    const selectedStartDateString = moment(selectedStartDate).format('YYYY-MM-DD');
    const selectedEndDateString = selectedEndDate ? moment(selectedEndDate).format('YYYY-MM-DD') : null;
    const selectedGuestCountString = Guests[selectedGuestCount].count;

    navigation.navigate(ScreenNameEnum.BOOKING_DETAILS, {
      selectedStartDate: selectedStartDateString,
      selectedEndDate: selectedEndDateString,
      selectedGuestCount: selectedGuestCountString,
      totalDays: totalDays,
      Property: data,
    });
    onClose(); // Close the modal after navigating
  };

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ translateY: translateY }] },
          ]}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{ alignItems: 'flex-end', marginRight: 20 }}
          >
            <Image
              source={require('../../assets/Cropping/Close2x.png')}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 20, marginHorizontal: 15 }}>
            <Text style={styles.title}>{localizationStrings.s_date}</Text>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={data.cat_id === '23' || data.cat_id === '24'}
              minDate={new Date()}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              onDateChange={handleDateChange}
            />
            <Text style={styles.title}>{localizationStrings.guest}</Text>
            <View style={styles.optionContainer}>
              <FlatList
                data={Guests}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.guestOption,
                      selectedGuestCount === index && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedGuestCount(index)}
                  >
                    <Text
                      style={[
                        styles.guestText,
                        selectedGuestCount === index && styles.selectedText,
                      ]}
                    >
                      {item.count}
                    </Text>
                    <Image
                      source={require('../../assets/Cropping/Person2x.png')}
                      style={styles.guestIcon}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleNext} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>{localizationStrings.next}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: hp(80),
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },
  optionContainer: {
    marginTop: 10,
  },
  guestOption: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 5,
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
  },
  guestIcon: {
    height: 20,
    width: 20,
  },
  searchButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 55,
    width: '100%',
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  selectedOption: {
    backgroundColor: '#000',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default DateModal;
