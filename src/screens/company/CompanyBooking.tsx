import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import BlackPin from '../../assets/svg/BlackPin.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  booking_request_accept_reject,
  get_Company_Canclebooking_list,
  get_Company_Completebooking_list,
  get_Company_booking_list,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';

export default function CompanyBooking() {
  const [selectedOption, setSelectedOption] = useState('Pending');
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const BList = [{ name: localizationStrings.Pending }, { name:localizationStrings.Complete}, { name: localizationStrings.Cancel }];

  const isFocused = useIsFocused();
  const BookingList = useSelector(state => state.feature.CBookingList);
  const BookingCompleteList = useSelector(
    state => state.feature.CBookingCompleteList,
  );
  const BookingCancelList = useSelector(
    state => state.feature.CBookingCancelList,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookingList();
  }, [user, selectedOption, isFocused]);



  const fetchBookingList = async () => {
    const params = {
      company_id: user?.id,
      status: selectedOption,
    };
    if (selectedOption === 'Pending') {

      await dispatch(get_Company_booking_list(params));
    }
    else if (selectedOption === 'Complete') {
      await dispatch(get_Company_Completebooking_list(params));
    }
    else {
      await dispatch(get_Company_Canclebooking_list(params));
    }
  };

  const handleBookingStatusChange = async (id, status) => {
    const params = {
      booking_id: id,
      status: status,
    };
    await dispatch(booking_request_accept_reject(params));
    setTimeout(() => {
      fetchBookingList();
    }, 2000);
  };

  const handleTabChange = type => {
    setSelectedOption(type);
    fetchBookingList();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(ScreenNameEnum.CbookingDetails)}
      style={[styles.shadow, styles.itemContainer]}>
      <View style={styles.itemRow}>
        <View style={styles.itemImageContainer}>
          {item.user_data.image != '' ? (
            <Image
              source={{ uri: item.user_data.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require('../../assets/Cropping/empty.jpg')}
              style={styles.itemImage}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.itemDetailsContainer}>
          <View style={styles.itemNameRow}>
            <Text style={styles.itemName}>
              {item.user_data.first_name} {item.user_data.last_name}
            </Text>
          </View>
          <View style={styles.itemDetailsRow}>
            <BlackPin />
            <Text style={styles.itemDetails}>{item.address}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={[styles.itemTime, { fontSize: 14 }]}>
              $ {item.amount}
            </Text>
          </View>
        </View>
      </View>
      {selectedOption === 'Pending' && (
        <View style={styles.itemFooter}>
          <TouchableOpacity
            onPress={() => handleBookingStatusChange(item.id, 'Complete')}
            style={[
              styles.statusButton,
              { backgroundColor: '#34A853', borderRadius: 10 },
              styles.shadow,
            ]}>
            <Text style={styles.statusButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBookingStatusChange(item.id, 'Cancel')}
            style={[
              styles.statusButton,
              { backgroundColor: 'red', borderRadius: 10 },
              styles.shadow,
            ]}>
            <Text style={styles.statusButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderItemCancleComplete = ({ item }) => (
    <View style={[styles.shadow, styles.itemContainer]}>
      <View style={styles.itemRow}>
        <View style={styles.itemImageContainer}>
          <Image
            source={{ uri: item.user_data.image }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.itemDetailsContainer}>
          <View style={styles.itemNameRow}>
            <Text style={styles.itemName}>
              {item.user_data.first_name} {item.user_data.last_name}
            </Text>
          </View>
          <View style={styles.itemDetailsRow}>
            <BlackPin />
            <Text style={styles.itemDetails}>{item.address}</Text>
          </View>
          <View style={styles.itemFooter2}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNameEnum.TRACK_ORDER)}
              style={[
                styles.statusButton2,
                {
                  backgroundColor:
                    selectedOption === 'Cancel' ? 'red' : '#34A853',
                },
                styles.shadow,
              ]}>
              <Text style={styles.statusButtonText}>{selectedOption}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.itemTime}>{item.Time}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{localizationStrings.no_booking_found}</Text>
    </View>
  );

  const currentData =
    selectedOption === 'Pending'
      ? BookingList
      : selectedOption === 'Cancel'
        ? BookingCancelList
        : BookingCompleteList;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{localizationStrings.Booking}</Text>
        </View>
        <View style={{ height: hp(5), marginTop: 20 }}>
          <FlatList
            data={BList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTabChange(item.name)}
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
                {selectedOption === item.name && (
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
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={currentData}
            renderItem={
              selectedOption === 'Pending'
                ? renderItem
                : renderItemCancleComplete
            }
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={renderEmptyList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  statusButton2: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: 30,
  },
  title: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontSize: 20,
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
    height: 80,
    width: 80,
    borderRadius: 15,
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
    fontSize: 18,
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
    fontSize: 10,
    lineHeight: 18,
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
    marginLeft: 5,
  },
  itemFooter: {
    marginTop: 20,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemFooter2: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
  },
  statusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('35%'),
    height: 35,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(50),
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
});

