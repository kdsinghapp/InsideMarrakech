import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BlackPin from '../../assets/svg/BlackPin.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_booking_list } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function CompanyBooking() {
    const [chooseBtn, setChooseBtn] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Pending');
    const user = useSelector(state => state.auth.userData);
    const isLoading = useSelector(state => state.feature.isLoading);
    const BookingList = useSelector(state => state.feature.BookingList);
    const isFocused = useIsFocused();
  
    const navigation = useNavigation()
    const dispatch =useDispatch()

console.log('====================================',user.id);
console.log(BookingList);
console.log('====================================');

    useEffect(()=>{
      get_booking_list()
    },[user,selectedOption])
    const get_booking_list = async()=>{
 const params = {
  user_id:user?.id,
  status:selectedOption
 }

 await dispatch(get_user_booking_list(params))
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.CbookingDetails)
        }}
        
        style={[styles.shadow, styles.itemContainer]}>
          <View style={styles.itemRow}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{uri:item.image}}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.itemDetailsContainer}>
              <View style={styles.itemNameRow}>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.itemDetailsRow}>
               <BlackPin />
                <Text style={styles.itemDetails}>{item.address}</Text>
               
              </View>
              <View style={{marginTop:10,}}>
                  <Text style={styles.itemTime}>$200,7 /night</Text>
                </View>
              
            </View>
          </View>
          <View style={styles.itemFooter}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.TRACK_ORDER);
                  }}
                  style={[
                    styles.statusButton,
                    { backgroundColor:  '#34A853' ,borderRadius:10 },
                    styles.shadow,
                  ]}
                >
                  <Text style={styles.statusButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.TRACK_ORDER);
                  }}
                  style={[
                    styles.statusButton,
                    { backgroundColor:  'red', borderRadius:10 },
                    styles.shadow,
                  ]}
                >
                  <Text style={styles.statusButtonText}>Reject</Text>
                </TouchableOpacity>
               
            
               
              </View>
        </TouchableOpacity>
      );
      const renderItemCancleComplete = ({ item }) => (
        <View style={[styles.shadow, styles.itemContainer]}>
          <View style={styles.itemRow}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{uri:item.image}}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.itemDetailsContainer}>
              <View style={styles.itemNameRow}>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.itemDetailsRow}>
              <BlackPin />
                <Text style={styles.itemDetails}>{item.address}</Text>
              </View>
              <View style={styles.itemFooter2}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.TRACK_ORDER);
                  }}
                  style={[
                    styles.statusButton2,
                    { backgroundColor: selectedOption == 'Cancel' ? 'red' : '#34A853' },
                    styles.shadow,
                  ]}
                >
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
  return (
    <View style={styles.container}>
      {isLoading?<Loading/>:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Booking </Text>
        </View>
        <View style={{height: hp(5), marginTop: 20,}}>
          <FlatList
            data={BList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={() => setSelectedOption(item.name)}
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

            {selectedOption == item.name &&    <View
                  style={{
                    height: 3,
                    backgroundColor: '#000',
                    width: '100%',
                    marginTop: 10,
                    borderRadius: 20,
                  }}
                />
            }
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={BookingList}
            renderItem={selectedOption === 'Pending'?renderItem:renderItemCancleComplete}
            keyExtractor={(item) => item.id}
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
    height:80,
    width: 80,
    borderRadius:15,
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
    fontSize:18,
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
    marginLeft:5
  },
  itemFooter: {
    marginTop: 20,
   paddingHorizontal:25,
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
    height:35,
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
  shadow:{
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
  }
  
});
const CompleteBooking = [
    {
      id: '1',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Completed',
      Time: 'March 26, 2024',
    },
    {
      id: '2',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Completed',
      Time: 'March 26, 2024',
    },
    {
      id: '4',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Completed',
      Time: 'March 26, 2024',
    },
  ];
  
  const CancelBooking = [
    {
      id: '1',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Canceled',
      Time: 'March 26, 2024',
    },
    {
      id: '2',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Canceled',
      Time: 'March 26, 2024',
    },
  ];
  const RquestBooking = [
    {
      id: '1',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Canceled',
      Time: 'March 26, 2024',
    },
    {
      id: '2',
      name: 'Marrakech Quad',
      Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
      img: require('../../assets/Cropping/img3.png'),
      status: 'Canceled',
      Time: 'March 26, 2024',
    },
  ];
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
