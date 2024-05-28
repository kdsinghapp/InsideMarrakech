import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchIcon from '../../assets/svg/search.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_chat_user } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function ChatPage() {
  const navigation = useNavigation();
const ChatUser = useSelector(state => state.feature.ChatUser)
const isLoading = useSelector(state => state.feature.isLoading)
const user = useSelector(state => state.auth.userData)
const isFocuse = useIsFocused();
const dispatch = useDispatch()
useEffect(()=>{

getChatuser()

},[isFocuse,user])


const getChatuser =async()=>{
  const params = {
    user_id:'1'
  }
  dispatch(get_chat_user(params))

}
console.log('====================================');
console.log(ChatUser);
console.log('====================================');
  const RecentListItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item });
      }}
      style={styles.itemContainer}>
      <View>
        <Image source={item.img} style={styles.avatar} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemStatus}>{item.status}</Text>
      </View>
      {/* <View>
        <Text style={styles.itemTime}>{item.time}</Text>
        <View style={[styles.notification, item.count.length < 2 ? styles.singleDigit : null]}>
          <Text style={styles.notificationText}>{item.count}</Text>
        </View> 
      </View>*/}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {isLoading?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Message" width={26} />
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, styles.shdow]}>
            <SearchIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#000'}
              style={styles.searchInput}
            />
          </View>
        </View>
      {ChatUser && 
       <View style={styles.listContainer}>
          <FlatList
            data={ChatUser}
            renderItem={RecentListItem}
            keyExtractor={item => item.id}
            ListFooterComponent={() => <View style={styles.footer} />}
          />
        </View>
}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    height: hp(10),
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    width: '65%',
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    color: '#000',
  },
  itemStatus: {
    color: '#874BE9',
    fontSize: 14,
    fontWeight: '700',
  },
  itemTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#B6B6B6',
    lineHeight: 18,
  },
  notification: {
    backgroundColor: '#000',
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  singleDigit: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  notificationText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
  },
  searchBox: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
  shdow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

const data = [
  {
    id: '1',
    name: 'Jenny Wilson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img1.png'),
    status: 'Typing...',
    count: '2',
  },
  {
    id: '2',
    name: 'Emerson',
    time: '08.00pm',
    img: require('../../assets/Cropping/img2.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '3',
    name: 'Ruben George',
    time: '08.00pm',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Have you spoken to the delivery...',
    count: '999',
  },
  {
    id: '4',
    name: 'Omar Kenter',
    time: '08.00pm',
    img: require('../../assets/Cropping/img4.png'),
    status: 'Have you spoken to the delivery...',
    count: '2',
  },
  {
    id: '5',
    name: 'Martin Botosh',
    time: '08.00pm',
    img: require('../../assets/Cropping/img5.png'),
  
    status: 'Have you spoken to the delivery...',
    count: '150',
  },
];
