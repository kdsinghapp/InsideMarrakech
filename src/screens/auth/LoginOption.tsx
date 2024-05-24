import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ImageBackground,
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
      <ImageBackground
      source={require('../../assets/Cropping/role.png')}
      style={{flex: 1, backgroundColor: '#fff'}}>
       
     
        
       
  
          <View style={{position: 'absolute',bottom:30,width:'100%'}}>
            <TouchableOpacity
              onPress={() => {
               
                Role('User')
              }}
              style={[
                styles.btn,
                
              ]}>
            <Image
              style={{height:50}}
              resizeMode='contain'
            source={require('../../assets/Cropping/roleuser.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              Role('Company')
               
             
              }}
              style={[
                styles.btn,
                
              ]}>
             <Image
             
             style={{height:50,marginTop:40}}
             resizeMode='contain'
             source={require('../../assets/Cropping/rolecompany.png')} />
            </TouchableOpacity>
          </View>
  
       
      
      
      </ImageBackground>
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
      height: hp(6),
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
  