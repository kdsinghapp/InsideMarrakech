import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import {styles} from '../../configs/Styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
export default function BookingDetails() {

    const navigation = useNavigation()
  return (
    <View style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#FFF'}}>
      
      <ScrollView>
      <ProfileHeader titile="Booking Details" width={18} />

      <View
        style={[
          styles.shadow,
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(12),
            backgroundColor: '#FFF',
            borderRadius: 10,
          },
        ]}>
        <View style={{marginLeft: 10}}>
          <Image
            source={require('../../assets/Cropping/img6.png')}
            style={{height: 80, width: 80}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginLeft: 10, width: '72%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
              Marralech Quad Booking
            </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
              MAD 165.3
            </Text>
          </View>
          <Text style={{marginTop: 10, color: '#777777', fontSize: 12}}>
            192 Rue Tachebatch,Marrkech 40000
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              justifyContent: 'space-around',
            }}>
            <DarkStar height={20} width={20} />
            <DarkStar height={20} width={20} />
            <DarkStar height={20} width={20} />
            <DarkStar height={20} width={20} />
            <DarkStar height={20} width={20} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#000',
                marginLeft: 5,
              }}>
              5.0
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
          Total
        </Text>
        <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
          MAD 84.97
        </Text>
      </View>

      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
          Contact Details
        </Text>
        <Text style={{fontSize: 12, color: '#777777', fontWeight: '500'}}>
          We'll use this information to send you confirmation and updates about
          your booking
        </Text>
      </View>

      <View
            style={[
              Styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
            ]}>
            <TextInputField
              placeholder="First Name"
              firstLogo={false}
              img={require('../../assets/Cropping/Lock3x.png')}
              showEye={false}
            />
          </View>
      <View
            style={[
              Styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
            ]}>
            <TextInputField
              placeholder="Last Name"
              firstLogo={false}
              img={require('../../assets/Cropping/Lock3x.png')}
              showEye={false}
            />
          </View>
      <View
            style={[
              Styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
            ]}>
            <TextInputField
              placeholder="Email"
              firstLogo={false}
              img={require('../../assets/Cropping/Lock3x.png')}
              showEye={false}
            />
          </View>
      <View
            style={[
              Styles.txtInput,
              {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
            ]}>
            <TextInputField
              placeholder="Phone Number"
              firstLogo={false}
              img={require('../../assets/Cropping/Lock3x.png')}
              showEye={false}
            />
          </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.TRAVELER_DETAILS);
            }}
            style={[
              styles.tabBtn,
              {
                backgroundColor: '#000',
                position:'absolute',
                bottom:20,
               
              },
            ]}>
            <Text
              style={{
                fontSize: 17,
                color: '#FFFFFF',
                fontWeight: '600',
                lineHeight: 25,
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
   
    </View>
  );
}


const Styles = StyleSheet.create({
    txtInput: {
        height: 60,
        
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        borderWidth: 1,
      },
})