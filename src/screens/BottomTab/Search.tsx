
  import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import SearchIcon from '../../assets/svg/search.svg';
  import {useNavigation} from '@react-navigation/native';
  import ScreenNameEnum from '../../routes/screenName.enum';
  import ProfileHeader from '../../configs/ProfileHeader';
  import Pin from '../../assets/svg/Pin.svg';
  import User from '../../assets/svg/user.svg';
import Down from '../../assets/svg/BlackDown.svg';
  export default function Search() {
    const navigation = useNavigation();
  
    const renderList = ({item}) => (
      <TouchableOpacity
  
      onPress={()=>{
        navigation.navigate(ScreenNameEnum.PLACE_DETAILS)
      }}
        style={[
          styles.shadow,
          {
            backgroundColor: '#FFF',
            height: hp(40),
            borderRadius: 15,
            padding: 10,
            margin: 5,
          },
        ]}>
        <Image
          source={item.img}
          style={{height: hp(20), width: '100%'}}
          resizeMode="cover"
        />
  
        <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 1}}>
          <Pin />
          <Text style={{fontSize: 14, fontWeight: '400', color: '#777777'}}>
            {item.details}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>
              {item.user}
            </Text>
  
            <User />
            <Down />
          </View>
  
          <TouchableOpacity 
          onPress={()=>{
            setModalVisible(true)
          }}
          
          
          style={{borderBottomWidth: 1}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={item.subTime}
          horizontal
          renderItem={({item, index}) => (
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                marginTop: 20,
                borderWidth: 1,
                height: 30,
                borderRadius: 30,
                marginLeft: 10,
              }}>
              <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>
                {item.time}
              </Text>
            </View>
          )}
        />
      </TouchableOpacity>
    );
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileHeader titile="Search" width={26} />
          <View style={{marginTop: 10, height: hp(8), justifyContent: 'center'}}>
            <View style={[styles.shdow, styles.search]}>
              <SearchIcon />
              <TextInput
                placeholder="Search"
                placeholderTextColor={'#000'}
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: '#000',
                  lineHeight: 18,
                }}
              />
            </View>
          </View>
        
          <FlatList
          showsVerticalScrollIndicator={false}
          data={Post}
          renderItem={renderList}
        />
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    txt: {
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 18,
      color: '#000',
      marginHorizontal: 10,
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
  
    colorDiv: {
      backgroundColor: '#874be9',
      height: hp(12),
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
    },
    search: {
      backgroundColor: '#FFF',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginHorizontal: 20,
      borderRadius: 15,
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
  

  const Post = [
    {
      title: 'Marrakech: Agafay Desert Tour with Quad',
      details: '192 Rue Tachenbacht, Marrakech 40000',
      img: require('../../assets/Cropping/img1.png'),
      user: 'Today 2',
      subTime: [
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
      ],
    },
    {
      title: 'Marrakech: Agafay Desert Tour with Quad',
      details: '192 Rue Tachenbacht, Marrakech 40000',
      img: require('../../assets/Cropping/img1.png'),
      user: 'Today 2',
      subTime: [
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
        {
          time: '08:10PM',
        },
      ],
    },
  ];