import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import BlackPin from '../../assets/svg/BlackPin.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styles } from '../../configs/Styles';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_booking_list } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import BookingDetailsModal from '../Modal/BookingDetailsModal';
import ScreenNameEnum from '../../routes/screenName.enum';
import AddRatingModal from '../Modal/RattingModal';
import localizationStrings from '../../utils/Localization';

export default function Booking() {
  const [selectedOption, setSelectedOption] = useState('Pending');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [BookingDetailVisible, setBookingDetailVisible] = useState(false);
  const [BookingData, setBookingData] = useState(null);
  const user = useSelector(state => state.auth.userData);
  const BookingList = useSelector(state => state.feature.BookingList);
  const isLoading = useSelector(state => state.feature.isLoading);
  



  
  const BList = [
    {
      name:localizationStrings.Pending,
      value:'Pending'
    },
    {
      name: localizationStrings.Complete,
      value:'Complete'
    },
    {
      name: localizationStrings.Cancel,
      value:'Cancel'
    },
  ];


  
  useEffect(() => {
    getListData(selectedOption);
  }, [selectedOption,BookingDetailVisible]);

  const getListData = async type => {

    try {
      const params = {
        user_id: user?.id,
        status: type,
      };

     
      
      await dispatch(get_user_booking_list(params));
    }
    catch (err) {
      console.log(err);

    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setBookingData(item);
        setBookingDetailVisible(true);
        // if (selectedOption == 'Complete') {
        //  // handleOpenModal();
        // }
        // if (selectedOption == 'Pending') {
         
        // }
      }}
      style={[styles.shadow, localStyles.itemContainer]}>
      <View style={localStyles.itemRow}>
        <View style={localStyles.itemImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={localStyles.itemImage}
            resizeMode="cover"
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
                  { color: selectedOption == 'Pending' ? '#000' : '#FFF' },
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
      <View  style={{marginTop:Platform.OS == 'ios'?15:0}}/>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title={localizationStrings.Booking} width={25} />
        <View style={{ height: hp(5), marginTop: 20 }}>
          <FlatList
            data={BList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedOption(item.value)}
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
          {BookingList?.length > 0? <FlatList
            showsVerticalScrollIndicator={false}
            data={
              BookingList
            }
            renderItem={renderItem}
           
          />:<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:80}}>
            
            <Text style={{color:'#000',fontWeight:'600',fontSize:18,  fontFamily: 'Federo-Regular',}}>{localizationStrings.no_booking_found}</Text>
            </View>
          }
        </View>
        <BookingDetailsModal
          visible={BookingDetailVisible}
          onClose={() => setBookingDetailVisible(false)}
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
    flex: 1,
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
    borderRadius: 15,
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
  listContainer: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
});

