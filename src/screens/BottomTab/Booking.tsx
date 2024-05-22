import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
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

export default function Booking() {
  const [chooseBtn, setChooseBtn] = useState(true);
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <View
      onPress={() => {
        //navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
      }}
      style={[
        styles.shadow,
        {
          borderRadius: 10,

          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          marginVertical: 10,
          padding: 15,
          width: '95%',
          paddingHorizontal: 5,
        },
      ]}>
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <View
          style={{
            height: 100,
            marginLeft: 5,
            width: 100,
          }}>
          <Image
            source={item.img}
            style={{
              height: 100,
              width: 100,

              borderColor: '#7756FC',
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{marginLeft: 15, width: '65%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 30,
                color: '#000000',
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <BlackPin />

            <Text
              style={{
                color: '#352C48',
                fontSize: 12,
                lineHeight: 18,
                fontWeight: '500',
              }}>
              {item.Details}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.TRACK_ORDER);
              }}
              style={[
                {
                  backgroundColor: item.status == 'Cancled' ? 'red' : '#000',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: wp('20%'),
                  height: 30,
                },
                styles.shadow,
              ]}>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 18,
                  fontWeight: '500',
                  color: '#FFF',
                }}>
                {item.status}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={{fontSize: 10, color: '#000', fontWeight: '500'}}>
                {item.Time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{paddingHorizontal: 15, backgroundColor: '#FFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Booking" width={25} />
        <View
          style={{
            height: hp(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            disabled={chooseBtn}
            onPress={() => {
              setChooseBtn(true);
            }}
            style={{
              //backgroundColor: chooseBtn ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('45%'),
              height: 47,
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 27,
                fontWeight: '500',
                color: '#000',
                borderBottomWidth: chooseBtn ? 2 : 0,
              }}>
              Complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!chooseBtn}
            onPress={() => {
              setChooseBtn(false);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              width: wp('45%'),
              height: 30,
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 27,
                fontWeight: '500',
                color: '#000',
                borderBottomWidth: chooseBtn ? 0 : 2,
              }}>
              Canceled
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 10, flex: 1, backgroundColor: '#FFF'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chooseBtn ? CompleteBooking : CancleBooking}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
const CancleBooking = [
  {
    id: '1',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Cancled',
    Time: 'March 26, 2024',
  },

  {
    id: '2',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Cancled',
    Time: 'March 26, 2024',
  },
];
