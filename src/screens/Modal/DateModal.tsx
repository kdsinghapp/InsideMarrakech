import React, { useRef, useEffect } from 'react';
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
  ScrollView,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';

const DateModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

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
      <TouchableOpacity
        onPress={() => {
          onClose();
          closeModal();
        }}
        activeOpacity={1}
        style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: translateY }],
            },
          ]}>
          <ScrollView>
            <View style={{ marginTop: 20, marginHorizontal: 15 }}>
              <Text style={styles.title}>Date</Text>
              <View style={styles.optionContainer}>
                <View style={styles.dateOption}>
                  <Text style={styles.dateText}>Wednesday 20 March</Text>
                </View>
                <View style={styles.dateOption}>
                  <Text style={styles.dateText}>Wednesday 20 March</Text>
                </View>
                <View style={styles.dateOption}>
                  <Text style={styles.dateText}>Wednesday 20 March</Text>
                </View>
              </View>
              <Text style={styles.title}>Guests</Text>
              <View style={styles.optionContainer}>
                <View style={styles.guestOption}>
                  <Text style={styles.guestText}>1</Text>
                  <Image source={require('../../assets/Cropping/Person2x.png')} style={styles.guestIcon} />
                </View>
                <View style={styles.guestOption}>
                  <Text style={styles.guestText}>1</Text>
                  <Image source={require('../../assets/Cropping/Person2x.png')} style={styles.guestIcon} />
                </View>
                <View style={styles.guestOption}>
                  <Text style={styles.guestText}>1</Text>
                  <Image source={require('../../assets/Cropping/Person2x.png')} style={styles.guestIcon} />
                </View>
                <View style={styles.guestOption}>
                  <Text style={styles.guestText}>1</Text>
                  <Image source={require('../../assets/Cropping/Person2x.png')} style={styles.guestIcon} />
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
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
    padding: 16,
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
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateOption: {
    borderWidth: 1,
    backgroundColor: '#000',
    width: '30%',
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Federo-Regular',
    fontSize: 8,
    fontWeight: '600',
    color: '#FFF',
  },
  guestOption: {
    borderWidth: 1,
    width: '20%',
    height: 40,
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
});

export default DateModal;
