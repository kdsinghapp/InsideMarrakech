import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {styles} from '../../configs/Styles';
import TextInputField from '../../configs/TextInput';
import ProfileHeader from '../../configs/ProfileHeader';


export default function ChangePassword() {

  const handleEmailText =()=>{

  }
return (
  <View style={{flex:1,backgroundColor:'#FFF',paddingHorizontal:15}}>
<ProfileHeader titile='Change Password'   width={13}/>

 
    <View style={[Styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:40,paddingRight:10}]}>
            <TextInputField 
          placeholder ='Current Password'
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png')}
          showEye={true}
            />
          </View>
    <View style={[Styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20,paddingRight:10}]}>
            <TextInputField 
          placeholder ='New Password'
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png')}
          showEye={true}
            />
          </View>
    <View style={[Styles.txtInput, {backgroundColor: '#FFFFFF',marginTop:20,paddingRight:10}]}>
            <TextInputField 
          placeholder ='Confirm New Password'
          firstLogo={true}
          img={require('../../assets/Cropping/Lock3x.png')}
          showEye={true}
            />
          </View>

    <TouchableOpacity

  
      style={[styles.tabBtn,{position:'absolute',bottom:10}]}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 17,
          color: '#FFF',
          lineHeight: 25.5,
          marginLeft: 10,
        }}>
        Save
      </Text>
    </TouchableOpacity>
  </View>
)
}

const Styles =StyleSheet.create({
  txtInput: {
    height:60,
    marginHorizontal: 20,
    borderRadius:30,
   justifyContent:'center',
 paddingLeft:10,
 borderWidth:1
 
  },
})