import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Pressable
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { booking_request_accept_reject, get_company_booking_detail, get_property_detail } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { styles } from '../../configs/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
import AddRatingModal from './RattingModal';
import localizationStrings from '../../utils/Localization';
import FastImage from 'react-native-fast-image';

const BookingDetailsModal = ({ visible, onClose, data }) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user = useSelector(state => state.auth.userData);
  const BookingDetails = useSelector(state => state.feature.BookingDetails);
  const isLoading = useSelector(state => state.feature.isLoading);
  const propertDetails = useSelector(state => state.feature.propertyDetail);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const [BookingData, setBookingData] = useState(null);
  useEffect(() => {
    if (data && user && isFocused) {
      get_booking();

    }
  }, [data, user, isFocused]);
  useEffect(() => {
    if (data && user && isFocused) {

      get_property()
    }
  }, [BookingDetails]);
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });


  const get_booking = () => {
    const params = {
      booking_id: data?.id,
    };

    dispatch(get_company_booking_detail(params));
  };
  const get_property = () => {
    const params = {
      id: BookingDetails?.property_id
    };

    dispatch(get_property_detail(params));
  };
  const handleOpenModal = () => {
    setModalVisible(true);
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
  const handleSubmitRating = ratingData => {
    onClose()
  };


  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleBookingStatusChange = async (status) => {
    try {
      const params = {
        booking_id: data.id,
        status: status,
      };
      await dispatch(booking_request_accept_reject(params)).then(res => {

        onClose()
      })
    }
    catch (err) {
      console.log('err', err);

    }
  };


  const renderBookingDetails = () => {
    if (!BookingDetails) return null;

    const imageUri = propertDetails?.main_image
    return (
      <>
        <View style={Styles.profileImageContainer}>
          {imageUri ? (
            <FlatList
              data={[...propertDetails?.document_gallery, { image: propertDetails?.main_image }]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable style={{ height: hp(20), width: wp(80), marginRight: 10 }}>
                  <FastImage
                    source={{ uri: item.image }}
                    style={Styles.profileImage}
                    resizeMode='cover'
                  />

                </Pressable>)}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
            />
          ) : (
            <Text>No Image Available</Text>
          )}
        </View>

        {propertDetails?.main_image && <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          {[...propertDetails?.document_gallery, { image: propertDetails?.main_image }]?.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: index === activeIndex ? 'green' : 'gray',
                margin: 5,
              }}
            />
          ))}
        </View>}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              onClose()
              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, { item: { id: BookingDetails?.property_id } });
            }}
            style={{
              backgroundColor: '#90bafc',
              borderRadius: 10, width: '45%', height: 45, alignItems: 'center', justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: "#fff" }}>{localizationStrings.Activity_details}</Text>
          </TouchableOpacity>
          {BookingDetails?.status !== 'Pending' && <TouchableOpacity

            onPress={() => {
              handleOpenModal()
            }}
            style={{
              backgroundColor: '#f5d1a2',
              borderRadius: 10, width: '45%', height: 45, alignItems: 'center', justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: "#fff" }}>{localizationStrings.rate_ex}</Text>
          </TouchableOpacity>}
          {BookingDetails?.status == 'Pending' && <TouchableOpacity
            onPress={() => handleBookingStatusChange('Cancel')}
            style={{
              backgroundColor: '#fc847c',
              borderRadius: 10, width: '45%', height: 45, alignItems: 'center', justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: "#fff" }}>{localizationStrings.Cancel}</Text>
          </TouchableOpacity>}

        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={[Styles.sectionHeader, { marginTop: 10 }]}>
            <Text style={Styles.sectionHeaderText}>{localizationStrings.Contact_d}</Text>
            <Text
              style={[
                Styles.sectionHeaderText,
                { fontSize: 12, marginTop: 0, color: '#878787' },
              ]}>
              {data?.description}
            </Text>
          </View>
          <Text style={Styles.sectionHeaderText}>
            {propertDetails?.book_online_mobile_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>{localizationStrings.name}: {data?.name?.substring(0, 30)}</Text>
            <Text
              style={[
                Styles.sectionHeaderText,
                { fontSize: 12, marginTop: 0, color: '#878787' },
              ]}>
              {data?.description}
            </Text>
          </View>
          <Text style={Styles.sectionHeaderText}>
            {localizationStrings.total}:  {BookingDetails?.amount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>{localizationStrings.B_date}</Text>

          </View>
          <Text style={Styles.sectionHeaderText}>
            {BookingDetails?.created_date}
          </Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.No_of_Guest}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{ color: '#878787' }}>{BookingDetails?.guest}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.name}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{ color: '#878787' }}>{BookingDetails?.first_name} {BookingDetails?.last_name}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.Mobile_number}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{ color: '#878787' }}>{BookingDetails?.mobile}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.email}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{ color: '#878787' }}>{BookingDetails?.email}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>{localizationStrings.address}</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{ color: '#878787' }}>{BookingDetails?.address}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={[Styles.labelText, { fontSize: 16, fontWeight: '600' }]}>
            {localizationStrings.Other_Guests}
          </Text>
        </View>
        <FlatList data={BookingDetails?.guest_data}
          renderItem={({ item, index }) => (
            <>

              <View style={[Styles.labelContainerWithMargin, { marginTop: 20 }]}>
                <Text style={Styles.labelText}>{localizationStrings.guest} {index + 1} {localizationStrings.name} </Text>
              </View>
              <View style={Styles.txtInput}>
                <Text style={{ color: '#878787' }}>{item.first_name} {item.last_name}</Text>
              </View>

            </>
          )}
        />
      </>
    );
  };

  return (
    <Modal visible={visible} transparent>
      <View style={Styles.container}>
        {isLoading && <Loading />}
        <Animated.View
          style={[Styles.modal, { transform: [{ translateY: translateY }] }]}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[Styles.title, { width: '15%' }]}></Text>
            <Text style={Styles.title}>Your Booking({BookingDetails?.status})</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{ alignItems: 'flex-end', marginRight: 30 }}>
              <Image
                source={require('../../assets/Cropping/Close2x.png')}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderBookingDetails()}
            <View style={{ height: hp(5) }} />
          </ScrollView>
        </Animated.View>
        <AddRatingModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRating}
          data={{ id: BookingDetails?.property_id }}
        />
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Federo-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: hp(10),
    minHeight: hp(90),
    paddingHorizontal: 30,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },
  profileImageContainer: {
    marginTop: 40,

    paddingHorizontal: 5,
    height: hp(20),
    width: '100%',
    borderRadius: 10,



  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,

  },
  sectionHeader: {

  },
  sectionHeaderText: {
    fontFamily: 'Federo-Regular',
    fontSize: 15,
    lineHeight: 30,
    fontWeight: '600',
    color: '#000',
  },
  labelContainerWithMargin: {
    width: '47%',
    paddingLeft: 0,
    marginTop: 10,
  },
  txtInput: {
    height: 40,

    justifyContent: 'center',

    backgroundColor: '#FFFFFF',
    marginTop: 5,

  },
});

export default BookingDetailsModal;
