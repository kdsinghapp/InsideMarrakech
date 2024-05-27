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
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const DateModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);


  console.log('=================data===================');
  console.log(data);
  console.log('====================================');
  const handleNext = () => {
    if (selectedDate !== null && selectedGuestCount !== null) {
      const selectedDateString = date[selectedDate].date;
      const selectedGuestCountString = Guests[selectedGuestCount].count;
      navigation.navigate(ScreenNameEnum.BOOKING_DETAILS, {
        selectedDate: selectedDateString,
        selectedGuestCount: selectedGuestCountString,
        Property:data
      });
      onClose(); // Close the modal after navigating
    }
  };
  const navigation = useNavigation();
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

  return (
    <Modal visible={visible} transparent>
      <View
       
        activeOpacity={1}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          <TouchableOpacity
          onPress={()=>{
            onClose()
          }}
          style={{ alignItems:'flex-end',marginRight:20}}>
<Image  source={require('../../assets/Cropping/Close2x.png')}  style={{height:30,width:30}}/>
          </TouchableOpacity>
          <View style={{ marginTop: 20, marginHorizontal: 15 }}>
            <Text style={styles.title}>Date</Text>
            <View style={styles.optionContainer}>
              <FlatList
                data={date}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateOption,
                      selectedDate === index && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedDate(index)}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate === index && styles.selectedText,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <Text style={styles.title}>Guests</Text>
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

          <TouchableOpacity onPress={() => {
handleNext()

          }} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Next</Text>
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
    minHeight: hp(50),
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
  dateOption: {
    borderWidth: 1,
    paddingVertical: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
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

const date = [
  {
    date: 'Wednesday 20 March',
  },
  {
    date: 'Thursday 21 March',
  },
  {
    date: 'Friday 22 March',
  },
  {
    date: 'Saturday 23 March',
  },
  {
    date: 'Sunday 24 March',
  },
  {
    date: 'Monday 25 March',
  },
  {
    date: 'Tuesday 26 March',
  },
];

const Guests = [
  {
    count: '1',
  },
  {
    count: '2',
  },
  {
    count: '3',
  },
  {
    count: '4',
  },
  {
    count: '5',
  },
  {
    count: '6',
  },
  {
    count: '7',
  },
];