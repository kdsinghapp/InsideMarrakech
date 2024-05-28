import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BlackPin from '../../assets/svg/BlackPin.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../configs/Styles';
import ProfileHeader from '../../configs/ProfileHeader';
import {useDispatch, useSelector} from 'react-redux';
import {get_user_booking_list} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import BookingDetailsModal from '../Modal/BookingDetailsModal';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function Booking() {
  const [chooseBtn, setChooseBtn] = useState(true);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Pending');
  const BookingList = useSelector(state => state.feature.BookingList);
  const BookingCompleteList = useSelector(
    state => state.feature.BookingCompleteList,
  );
  const BookingCancelList = useSelector(
    state => state.feature.BookingCancelList,
  );
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const [modalMenuVisible,setmodalMenuVisible] =useState(false)
  const [BookingData,setBookingData] = useState(null)
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    get_booking_list();
  }, [user, selectedOption]);
  const get_booking_list = async () => {
    const params = {
      user_id: user?.id,
      status: selectedOption,
    };

    await dispatch(get_user_booking_list(params));
  };


  const Completebooking_list = async () => {
    const params = {
      user_id: user?.id,
      status: selectedOption,
    };

    await dispatch(get_Completebooking_list(params));
  };


  const Cancelbooking_list = async () => {
    const params = {
      user_id: user?.id,
      status: selectedOption,
    };

    await dispatch(get_Cancelbooking_list(params));
  };

  const getListData = async type => {
    setSelectedOption(type);
    if(selectedOption =='Cancel'){
      Cancelbooking_list()
    }
    else if(selectedOption == 'Complete'){
      Completebooking_list()
    }
    else{
      get_booking_list()
    }
  };
  const renderItem = ({item}) => (
    <TouchableOpacity 
    onPress={()=>{
      setBookingData(item)
      setmodalMenuVisible(true)
    }}
    style={[styles.shadow, localStyles.itemContainer]}>
      <View style={localStyles.itemRow}>
        <View style={localStyles.itemImageContainer}>
          <Image
            source={{uri: item.image}}
            style={localStyles.itemImage}
            resizeMode="contain"
          />
        </View>
        <View style={localStyles.itemDetailsContainer}>
          <View style={localStyles.itemNameRow}>
            <Text style={localStyles.itemName}>{item.name}</Text>
          </View>
          <View style={localStyles.itemDetailsRow}>
            <BlackPin />
            <Text style={localStyles.itemDetails}>{item.Details}</Text>
          </View>
          <View style={localStyles.itemFooter}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.TRACK_ORDER);
              }}
              style={[
                localStyles.statusButton,
                {
                  backgroundColor:
                    selectedOption === 'Cancel'
                      ? 'red'
                      : selectedOption == 'Pending'
                      ? '#f0f0f0'
                      : '#34A853',
                },
                styles.shadow,
              ]}>
              <Text
                style={[
                  localStyles.statusButtonText,
                  {color: selectedOption == 'Pending' ? '#000' : '#FFF'},
                ]}>
                {selectedOption}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={localStyles.itemTime}>{item.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={localStyles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title="Booking" width={25} />
        <View style={{height: hp(5), marginTop: 20}}>
          <FlatList
            data={BList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  getListData(item.name);
                }}
                style={{
                  width: wp(29),
                  alignItems: 'center',
                  justifyContent: 'center',

                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '500',
                    fontFamily: 'Federo-Regular',
                  }}>
                  {item.name}
                </Text>

                {selectedOption == item.name && (
                  <View
                    style={{
                      height: 3,
                      backgroundColor: '#000',
                      width: '100%',
                      marginTop: 10,
                      borderRadius: 20,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={localStyles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selectedOption == 'Cancel'?BookingCancelList:selectedOption == 'Complete'?BookingCompleteList:BookingList}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
          />
        </View>
        <BookingDetailsModal  
 visible={modalMenuVisible}
 onClose={() => setmodalMenuVisible(false)}
 data={BookingData}
        />
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    padding: 15,
    width: '95%',
    paddingHorizontal: 5,
  },
  itemRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  itemImageContainer: {
    height: 100,
    marginLeft: 5,
    width: 100,
  },
  itemImage: {
    height: 100,
    borderRadius: 10,
    width: 100,
    borderColor: '#7756FC',
  },
  itemDetailsContainer: {
    marginLeft: 15,
    width: '65%',
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#000000',
    fontFamily: 'Federo-Regular',
  },
  itemDetailsRow: {
    flexDirection: 'row',
  },
  itemDetails: {
    color: '#352C48',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
  },
  itemFooter: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
  },
  statusButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: 30,
  },
  statusButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#FFF',
    fontFamily: 'Federo-Regular',
  },
  itemTime: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
  },
  toggleButtonsContainer: {
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('45%'),
    height: 47,
  },
  toggleButtonText: {
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
const BList = [
  {
    name: 'Pending',
  },
  {
    name: 'Complete',
  },
  {
    name: 'Cancel',
  },
];
