import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {CountryPicker} from 'react-native-country-codes-picker';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
  import TextInputField from '../../configs/TextInput';
  import Gicon from '../../assets/svg/Gicon.svg';
  import ScreenNameEnum from '../../routes/screenName.enum';
  import { login, updateSelectedRole } from '../../redux/feature/authSlice';
  import { errorToast } from '../../configs/customToast';
  import { useDispatch, useSelector } from 'react-redux';
  
  export default function LoginOption() {
  const navigation =useNavigation()
  const [selectRole,setselectRole] = useState('')
  const dispatch = useDispatch()
const Role =(type)=>{

    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN,{role:type})
    dispatch(updateSelectedRole(type));
    setselectRole(type)
}

  
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Image
            source={require('../../assets/Cropping/Logo3x.png')}
            style={{height: 180, width: 180}}
            resizeMode="contain"
          />
        </View>
        <View>
        
       
        <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
<Text style={{fontFamily: 'Federo-Regular',fontSize:22,color:'#000',fontWeight:'600'}}>Select Your Login </Text>
        </View>
          <View style={{marginTop: hp(3)}}>
            <TouchableOpacity
              onPress={() => {
               
                Role('User')
              }}
              style={[
                styles.btn,
                {
                    borderWidth:2,
                    borderColor:selectRole=='User'?'green':'#000',
                     marginTop:20
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Federo-Regular',
                  fontSize: 17,
                  color:'#000',
                  fontWeight: '600',
                  lineHeight: 25,
                }}>
            User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              Role('Company')
               
             
              }}
              style={[
                styles.btn,
                {
                 borderWidth:2,
                 borderColor:selectRole=='Company'?'green':'#000',
                  marginTop:20
                },
              ]}>
              <Text
                style={{
                  fontSize: 17,
                  color:'#000',
                  fontWeight: '600',
                  lineHeight: 25,
                  fontFamily: 'Federo-Regular',
                }}>
             Company
              </Text>
            </TouchableOpacity>
          </View>
  
       
      
        </View>
      
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      marginHorizontal: 10,
      padding: 5,
      borderRadius: 15,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 2,
      paddingBottom: 30,
    },
    btn: {
      height: hp(15),
      marginHorizontal: 20,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtInput: {
      height: 60,
      marginHorizontal: 20,
      borderRadius: 30,
      justifyContent: 'center',
      paddingLeft: 10,
      borderWidth: 1,
    },
  });
  