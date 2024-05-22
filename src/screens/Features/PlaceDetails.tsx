import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import GoldRight from '../../assets/svg/GoldRight.svg';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import Pin from '../../assets/svg/BlackPin.svg';
import Call from '../../assets/svg/call.svg';
import Chat from '../../assets/svg/chat.svg';
import Star from '../../assets/svg/Star.svg';
import {styles} from '../../configs/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
export default function PlaceDetails() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/Cropping/img1.png')}
          style={{height: hp(25)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginTop: 20, marginLeft: 15}}>
            <GoldRight />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <View style={{marginTop: 10, paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, color: '#000'}}>
              Marrakech Quad Biking
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pin />
            <Text style={{fontSize: 12, color: '#000'}}>
              192 Rue Tachenbacht, Marrakech 40000
            </Text>
          </View>

          <View style={Styles.star}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </View>
              <Text style={{fontSize: 12, color: '#000', fontWeight: '800'}}>
                5.0
              </Text>
            </View>

            <Text style={{color: '#000', fontWeight: '800', fontSize: 14}}>
              From MAD 165,3
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 40,
            }}>
            <TouchableOpacity 
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.BOOKING_DETAILS)
            }}
            
            style={Styles.btn}>
              <Text>BOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.btn}>
              <Text>MENU</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '500',
              }}>
              Gallery Photos
            </Text>

            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '500',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <FlatList
              data={GalleryData}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => (
                <View>
                  <Image
                    source={item.Img}
                    resizeMode="contain"
                    style={{height: 100, width: 100, marginHorizontal: 10}}
                  />
                </View>
              )}
            />
          </View>

          <View style={{marginTop: 20, marginHorizontal: 15}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 30,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Call />
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontWeight: '500',
                }}>
                Book online or call: +212 679-419149
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate(ScreenNameEnum.CHAT_CONTACT_SCREEN)
            }}
              style={{
                borderWidth: 1,
                borderRadius: 30,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Chat />
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontWeight: '500',
                }}>
                Chat now
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
              Agafay Desert
            </Text>
            <Text style={{fontSize: 14, color: '#000', fontWeight: '400'}}>
              Lorem ipsum dolor sit amet consectetur. A purus parturient sed
              enim erat. Mattis eget tincidunt dolor consequat molestie ante.
              Nibh consequat at sed magna turpis lectus. Mi urna libero sit
              pellentesque orci in lectus. Eu mauris pretium elit fusce laoreet
              vestibulum interdum amet sagittis. Adipiscing at sit mi purus
              sodales. Ut luctus facilisis imperdiet massa purus nulla iaculis
              consectetur in. Scelerisque consectetur euismod ultrices nibh
              consectetur massa sed eu. Faucibus cras blandit cras.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 30,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,

            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              marginLeft: 10,
              fontWeight: '400',
            }}>
            BOOK
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 20, paddingHorizontal:20}}>
          <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
            Opening hours
          </Text>
          <Text style={{fontSize: 14, color: '#777777', fontWeight: '400'}}>
            Open 7 days a week
          </Text>
        </View>
        <View style={{marginHorizontal:20,marginTop:20}}>
          <Text style={{fontSize: 14, color: '#777777', fontWeight: '400'}}>
            Lunch
          </Text>
          <Text style={{fontSize: 14, color: '#777777', fontWeight: '400'}}>
            12h-15h
          </Text>
        </View>
        <View style={{marginHorizontal:20,marginTop:20}}>
          <Text style={{fontSize: 14, color: '#777777', fontWeight: '400'}}>
          Dinner
          </Text>
          <Text style={{fontSize: 14, color: '#777777', fontWeight: '400'}}>
          7pm-2am
          </Text>
        </View>
        <View
                style={{
                  padding: 5,
                  height: hp(25),
                  width: hp(45),
                  marginLeft: 15,
                }}>
                <ImageBackground
                  source={require('../../assets/Cropping/img2.png')}
                  style={{
                    width: '100%',

                    height: '100%',
                    padding: 10,
                  }}
                  resizeMode="contain">
                  <View style={{marginTop:30}}>
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
                      style={{color: '#fff', marginTop:10,fontSize: 12, fontWeight: '400'}}>
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

              <View style={{marginHorizontal:20}}> 
                 <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
              How to get to
          </Text>
                 <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
                 Agafay Desert
          </Text>
               
              </View>
           <ImageBackground

           style={{height:hp(30),marginTop:10,justifyContent:'center',alignItems:'center'}}
                  source={require('../../assets/Cropping/map.png')}>
           <TouchableOpacity
                    style={{
                      backgroundColor: '#FFF',
                    paddingHorizontal:20,

                      borderWidth:1,
                      paddingVertical:10,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{color: '#000', fontWeight: '500', fontSize: 14}}>
                     OPEN IN MAPS
                    </Text>
                  </TouchableOpacity>
              </ImageBackground>
        <View style={{height: hp(5)}} />
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  star: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    borderWidth: 1,
    height: 45,

    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GalleryData = [
  {
    Img: require('../../assets/Cropping/img4.png'),
  },
  {
    Img: require('../../assets/Cropping/img5.png'),
  },
  {
    Img: require('../../assets/Cropping/img6.png'),
  },
  {
    Img: require('../../assets/Cropping/img4.png'),
  },
  {
    Img: require('../../assets/Cropping/img5.png'),
  },
  {
    Img: require('../../assets/Cropping/img6.png'),
  },
];
