import React, {useRef, useEffect} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {get_company_booking_detail} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import {styles} from '../../configs/Styles';

const BookingDetailsModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const user = useSelector(state => state.auth.userData);
  const BookingDetails = useSelector(state => state.feature.BookingDetails);
  const isLoading = useSelector(state => state.feature.isLoading);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && user && isFocused) {
      get_property();
    }
  }, [data, user, isFocused]);

  const get_property = () => {
    const params = {
      booking_id: data?.id,
    };

    dispatch(get_company_booking_detail(params));
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

  const renderBookingDetails = () => {
    if (!BookingDetails) return null;

    const imageUri = BookingDetails?.user_data?.image;
    return (
      <>
        <View style={Styles.profileImageContainer}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={Styles.profileImage} />
          ) : (
            <Text>No Image Available</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>{data?.name}</Text>
            <Text
              style={[
                Styles.sectionHeaderText,
                {fontSize: 12, marginTop: 0, color: '#878787'},
              ]}>
              {data?.description}
            </Text>
          </View>
          <Text style={Styles.sectionHeaderText}>
            Total pay ${BookingDetails?.amount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>Booking Date</Text>
           
          </View>
          <Text style={Styles.sectionHeaderText}>
            {BookingDetails?.created_date}
          </Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>No of Guest</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{BookingDetails?.guest}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Name</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{BookingDetails?.first_name} {BookingDetails?.last_name}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Phone No.</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{BookingDetails?.mobile}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Email</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{BookingDetails?.email}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={Styles.labelText}>Address</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{BookingDetails?.address}</Text>
        </View>
        <View style={Styles.labelContainerWithMargin}>
          <Text style={[Styles.labelText, {fontSize: 16, fontWeight: '600'}]}>
            Other Guests
          </Text>
        </View>
        <FlatList  data={BookingDetails?.guest_data}
        renderItem={({item,index})=>(
<>
      
        <View style={[Styles.labelContainerWithMargin, {marginTop: 20}]}>
          <Text style={Styles.labelText}>Guest {index+1} name</Text>
        </View>
        <View style={Styles.txtInput}>
          <Text style={{color: '#878787'}}>{item.first_name} {item.last_name}</Text>
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
          style={[Styles.modal, {transform: [{translateY: translateY}]}]}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[Styles.title, {width: '15%'}]}></Text>
            <Text style={Styles.title}>Your Booking</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{alignItems: 'flex-end', marginRight: 30}}>
              <Image
                source={require('../../assets/Cropping/Close2x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderBookingDetails()}
            <View style={{height: hp(5)}} />
          </ScrollView>
        </Animated.View>
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
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Federo-Regular',
  },
  profileImageContainer: {
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 110,
    width: 110,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    ...styles.shadow,
  },
  profileImage: {
    height: 90,
    width:'100%',
    borderRadius: 45,
  },
  sectionHeader: {
    marginTop: hp(3),
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
    paddingLeft:0,
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
