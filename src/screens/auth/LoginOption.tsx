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
  import Company from '../../assets/svg/Company.svg';
  import Loginuser from '../../assets/svg/Loginuser.svg';
  import Backaro from '../../assets/svg/Blackaro.svg';
  import ScreenNameEnum from '../../routes/screenName.enum';
  import { login, updateSelectedRole } from '../../redux/feature/authSlice';
  import { errorToast } from '../../configs/customToast';
  import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import localizationStrings from '../../utils/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function LoginOption() {
  const navigation =useNavigation()
  const [selectRole,setselectRole] = useState('')
  const dispatch = useDispatch()
  const [value, setValue] = useState('en');
  const [items] = useState([
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' },
    // Add more languages here
  ]);
  const handleChangeLanguage =async (language) => {
    localizationStrings.setLanguage(language);
    await AsyncStorage.setItem("Lng", language)


    setValue(language);
  };

const Role =(type)=>{

    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN,{role:type})
    dispatch(updateSelectedRole(type));
    setselectRole(type)
}

  
    return (
      <ImageBackground
      source={require('../../assets/Cropping/role.png')}
      style={{flex: 1, backgroundColor: '#fff'}}>
       
     
        
       
  
          <View style={{position: 'absolute',bottom:hp(5),width:'100%'}}>
            <TouchableOpacity
              onPress={() => {
               
                Role('User')
              }}
              style={[
                styles.btn,
                
              ]}>
           <Loginuser />
           <Text style={{fontSize:16,color:'#000',fontWeight:'700',width:'75%'}}>{localizationStrings.User}</Text>
           <Backaro />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
              Role('Company')
               
             
              }}
              style={[
                styles.btn,
                
              ]}>
           <Company />
           <Text style={{fontSize:16,color:'#000',fontWeight:'700',width:'75%'}}>{localizationStrings.Company}</Text>
           <Backaro />

            </TouchableOpacity>
 

            <Dropdown
        style={styles.dropdown}
        data={items}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        value={value}
        
        onChange={item => handleChangeLanguage(item.value)}
      />
  
          </View>
      
      
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    dropdown: {
      marginTop:30,
      height:50,
      borderColor: 'gray',
      width:'90%',
      alignSelf:'center',
      backgroundColor:'#fff',
      borderWidth: 0.5,
      borderRadius:12,
      paddingHorizontal: 8,
      marginBottom: 20,
    },
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
      borderRadius:15,
      justifyContent:'space-between',
      paddingHorizontal:20,
      alignItems: 'center',
      flexDirection:'row',
      backgroundColor:'#fff',
      marginTop:10
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
  