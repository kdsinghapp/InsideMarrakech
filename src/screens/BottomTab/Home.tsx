import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../configs/Header';
import Searchbar from '../../configs/Searchbar';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BlackDown from '../../assets/svg/BlackDown.svg';
import Pin from '../../assets/svg/Pin.svg';
import User from '../../assets/svg/user.svg';
import Down from '../../assets/svg/BlackDown.svg';
import {styles} from '../../configs/Styles';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import DateModal from '../Modal/DateModal';
import { useSelector } from 'react-redux';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.auth.userData);

  console.log('=====================user===============');
  console.log(user);
  console.log('====================================');
const navigation = useNavigation()
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
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Searchbar
          setModal={() => {
            setIsVisible(true);
          }}
        />

        <View style={{height: hp(12), marginTop: 10, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: '500',
              }}>
              Category
            </Text>
            <BlackDown />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={Category}
              horizontal
              renderItem={({item, index}) => (
                <View style={{padding: 5, width: 100}}>
                  <Image source={item.logo} style={{height: 30, width: 30}} />
                  <Text
                    style={{fontSize: 10, fontWeight: '500', color: '#000'}}>
                    {item.title}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={{width: '100%', height: hp(25)}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={Banner}
            horizontal
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: 5,
                  height: hp(25),
                  width: hp(45),
                  marginLeft: 15,
                }}>
                <ImageBackground
                  source={item.img}
                  style={{
                    width: '100%',

                    height: '100%',
                    padding: 10,
                  }}
                  resizeMode="contain">
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        width: '60%',
                        fontSize: 14,
                        fontWeight: '400',
                      }}>
                      Exploring the Surroundings of Essaouira
                    </Text>
                    <Text
                      style={{color: '#fff', fontSize: 12, fontWeight: '400'}}>
                      By Car, Motorbike, Motorhome, Coach, By Bike
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFF',
                      width: '20%',

                      position: 'absolute',
                      bottom: 40,
                      left: 20,
                      paddingVertical: 5,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{color: '#000', fontWeight: '500', fontSize: 14}}>
                      View
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={Post}
          renderItem={renderList}
        />
        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',

                borderRadius: 20,
                width: '90%',
                height: hp(60),
                padding: 10,
              }}>
             
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: hp(5),
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize:20,
                    lineHeight: 36,
                    color: '#000',
                  }}>
                  Time Range
                </Text>

               
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: hp(8),
                 
                  marginVertical:10,
                  flexDirection:'row',
                  
                }}>
              <View style={{borderWidth:1,width:'20%',height:40,borderRadius:30,alignItems:'center',justifyContent:'center'}}>

<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>1 Hours</Text>

              </View>
              <View style={{borderWidth:1,width:'20%',height:40,borderRadius:30,alignItems:'center',justifyContent:'center'}}>

<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>1 Hours</Text>

              </View>
              <View style={{borderWidth:1,width:'20%',height:40,borderRadius:30,alignItems:'center',justifyContent:'center'}}>

<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>1 Hours</Text>

              </View>
              <View style={{borderWidth:1,width:'20%',height:40,borderRadius:30,alignItems:'center',justifyContent:'center'}}>

<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>1 Hours</Text>

              </View>

               
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: hp(5),
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize:20,
                    lineHeight: 36,
                    color: '#000',
                  }}>
                Person
                </Text>

               
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: hp(8),
                 
                  marginVertical:10,
                  flexDirection:'row',
                  
                }}>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
           

               
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: hp(5),
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize:20,
                    lineHeight: 36,
                    color: '#000',
                  }}>
             budget range
                </Text>

               
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
                }}
                style={{
               width:'90%',
                  alignSelf: 'center',
                borderWidth:1,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                  position:'absolute',
                  bottom:40
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#000',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <DateModal visible={modalVisible}  onClose={() => setModalVisible(false)}  />
      </ScrollView>
    </View>
  );
}

const Category = [
  {
    title: 'Quad',
    logo: require('../../assets/Cropping/quad2x.png'),
  },
  {
    title: 'buggy',
    logo: require('../../assets/Cropping/buggy2x.png'),
  },
  {
    title: 'restaurants',
    logo: require('../../assets/Cropping/restaurants2x.png'),
  },
  {
    title: 'tour guided',
    logo: require('../../assets/Cropping/tourguided2x.png'),
  },
];
const Banner = [
  {
    img: require('../../assets/Cropping/img2.png'),
  },
  {
    img: require('../../assets/Cropping/img2.png'),
  },
  {
    img: require('../../assets/Cropping/img2.png'),
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
