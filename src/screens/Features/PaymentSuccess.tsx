import { View, Text ,Image,TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '../../configs/ProfileHeader'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { styles } from '../../configs/Styles'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../../routes/screenName.enum'


export default function PaymentSuccess() {

    const navigation = useNavigation()
  return (
    <View style={{flex:1,backgroundColor:'#FFF'}}>
      <View style={{marginTop:40,alignSelf:'center',}}>
        <Text style={{fontSize:22,fontWeight:'600',color:'#000'}}>SuccessFully</Text>
      </View>
      <View
          style={{
            height: hp(40),
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/Cropping/I_1a3x.png')}
            style={{height: '90%', width: '90%'}}
            resizeMode="contain"
          />
        </View>
   <View style={{alignItems:'center',marginTop:20,paddingHorizontal:0}}>
   <Text style={{fontSize:20,fontWeight:'600',color:'#000',}}>Your booking is confirmed! 🎉</Text>
   <Text style={{fontSize:12,fontWeight:'400',color:'#777777',marginTop:15}}>Lorem ipsum dolor sit amet consectetur. Semper odio nullam neque </Text>
   <Text style={{fontSize:12,fontWeight:'400',color:'#777777',}}>lacus sit egestas.</Text>
   </View>
     
   <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          }}
          style={[
            styles.tabBtn,
            {
              backgroundColor: '#000',
              bottom:20,
              position:'absolute'
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight:20,
            }}>
            BACK TO HOME
          </Text>
        </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
    txtInput: {
      height: 50,
  
      borderRadius: 30,
      justifyContent: 'center',
      paddingLeft: 10,
      borderWidth: 1,
    },
  });
  