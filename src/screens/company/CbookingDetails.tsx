
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import TextInputField from '../../configs/TextInput';
import Edit from '../../assets/svg/Edit.svg';
import ProfileHeader from '../../configs/ProfileHeader';
import { styles } from '../../configs/Styles';
import Loading from '../../configs/Loader';
import { booking_request_accept_reject, get_company_booking_detail, get_property_detail, update_profile } from '../../redux/feature/featuresSlice';
import { get_profile } from '../../redux/feature/authSlice';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function CbookingDetails() {
  const route = useRoute()

  const { item } = route.params

  const isLoading = useSelector(state => state.feature.isLoading);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [imageUrl, setimageUrl] = useState('');

  const screenHeight = Dimensions.get('screen').height;

  const user = useSelector(state => state.auth.userData);
  const BookingDetails = useSelector(state => state.feature.BookingDetails);

  const propertDetails = useSelector(state => state.feature.propertyDetail);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [BookingData, setBookingData] = useState(null);
  useEffect(() => {
    if (item && user && isFocused) {
      get_booking();

    }
  }, [item, user, isFocused]);
  useEffect(() => {
    if (item && user && isFocused) {

      get_property()
    }
  }, [BookingDetails]);

  const get_booking = () => {
    const params = {
      booking_id: item?.id,
    };

    dispatch(get_company_booking_detail(params));
  };
  const get_property = () => {
    const params = {
      id: BookingDetails?.property_id
    };

    dispatch(get_property_detail(params));
  };


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


  return (
    <View style={Styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title="Booking Details" width={21} />
        <View

          style={Styles.profileImageContainer}>
          {BookingDetails?.user_data?.image == '' ? (
            <Text style={{ fontFamily: 'Federo-Regular', fontSize: 18, color: '#000', fontWeight: '600' }}>
              {BookingDetails?.user_data.first_name[0]?.toUpperCase()}
              {BookingDetails?.user_data.last_name[0]?.toUpperCase()}
            </Text>
          ) : (
            <Image source={{ uri: BookingDetails?.user_data?.image }} style={Styles.profileImage} />
          )}
          <View style={{ marginLeft: 20 }}>
            <Text style={[Styles.sectionHeaderText, { marginTop: 5 }]}>{BookingDetails?.user_data?.first_name} {BookingDetails?.user_data?.last_name}</Text>
            <Text style={[Styles.sectionHeaderText, { marginTop: 0 }]}>{BookingDetails?.user_data?.email}</Text>
            <Text style={[Styles.sectionHeaderText, { marginTop: 0 }]}>Contact: {BookingDetails?.user_data?.mobile}</Text>
          </View>
          <View style={{ position: 'absolute', right: 5, top: 6,
          borderRadius:5,paddingHorizontal:10,
          backgroundColor:BookingDetails?.status == 'Cancel' ? 'red' :BookingDetails?.status == 'Complete'? '#34A853':'#f0f0f0' }}>
            <Text style={[Styles.sectionHeaderText, { fontSize: 12,color:BookingDetails?.status == 'Pending'?'#000':'#fff' }]}>Status: {BookingDetails?.status}</Text>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,paddingHorizontal:10 }}>
          {BookingDetails?.status !== 'Pending' ? <TouchableOpacity
            onPress={() => {

              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, { item: { id: BookingDetails?.property_id } });
            }}
            style={{
              backgroundColor: '#90bafc',
              borderRadius: 10, width:BookingDetails?.status !== 'Pending'?'100%': '45%', height: 45, alignItems: 'center', justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: "#fff" }}> Activity details</Text>
          </TouchableOpacity>
            :

            <TouchableOpacity
    
                onPress={() => handleBookingStatusChange('Complete')}
           
              style={{
                backgroundColor: '#74c272',
                borderRadius: 10, width: '45%', height: 45, alignItems: 'center', justifyContent: 'center'
              }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: "#fff" }}>Accept</Text>
            </TouchableOpacity>}
       
          
          {BookingDetails?.status == 'Pending' && <TouchableOpacity
            onPress={() => handleBookingStatusChange('Cancel')}
            style={{
              backgroundColor: '#fc847c',
              borderRadius: 10, width: '45%', height: 45, alignItems: 'center', justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: "#fff" }}>Cancel</Text>
          </TouchableOpacity>}

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,paddingHorizontal:15}}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>{propertDetails?.name}</Text>
            <Text style={[Styles.sectionHeaderText, { fontSize: 12, marginTop: 0, color: '#878787' }]}>{propertDetails?.address}</Text>
          </View>
          <Text style={Styles.sectionHeaderText}>{BookingDetails?.amount}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal:15
          }}>
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionHeaderText}>Booking Date </Text>
           
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

        

       


      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: hp(13),
    marginHorizontal: 10,
    borderRadius: 10,
    ...styles.shadow,
    backgroundColor: '#fff'
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 15
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  sectionHeader: {
    marginTop: hp(3),
  },
  sectionHeaderText: {
    fontFamily: 'Federo-Regular',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  labelContainer: {
    width: '47%',
    paddingLeft: 20,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Federo-Regular',
   
  },
  labelContainerWithMargin: {
    width: '47%',
  marginLeft:15,
    marginTop: 10,
  },
  inputContainer: {
    width: '47%',
  },
  txtInput: {
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal:15,
    justifyContent: 'center',
 

    backgroundColor: '#FFFFFF',
    marginTop: 5,
    paddingRight: 10,
  },
  datePickerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  saveButton: {
    ...styles.tabBtn,
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFF',
    lineHeight: 25.5,
    marginLeft: 10,
    fontFamily: 'Federo-Regular',
  },
});
