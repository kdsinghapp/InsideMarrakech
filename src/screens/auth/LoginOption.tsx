import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CountryPicker } from 'react-native-country-codes-picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation()
  const [selectRole, setselectRole] = useState('User')
  const dispatch = useDispatch()
  const [value, setValue] = useState('French');
  const [items] = useState([
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' },
    // Add more languages here
  ]);

  useEffect(()=>{
    handleChangeLanguage('French')
  },[])
  const handleChangeLanguage = async (language) => {
    localizationStrings.setLanguage(language);
    await AsyncStorage.setItem("Lng", language)


    setValue(language);
  };

  const Role = (type) => {
    setselectRole(type)
    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN, { role: type })
    dispatch(updateSelectedRole(type));
    setselectRole(type)
  }


  return (
    <ImageBackground
      source={require('../../assets/Cropping/role.png')}
      style={{ flex: 1, backgroundColor: '#fff' }}>





      <View style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: hp(10),
      }}>
        <TouchableOpacity
          onPress={() => {

            Role('User')
          }}
          style={[
            styles.btn, { backgroundColor: selectRole == 'User' ? '#e5c96c' : '#000' }

          ]}>
          <Image
            style={{ height: 80, width: 80 }}
            resizeMode='contain'
            source={selectRole == 'User' ? require('../../assets/Cropping/Image3x-2.png') : require('../../assets/Cropping/Image3x.png')} />


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => {
            Role('Company')

          }}

          style={[
            styles.btn, { backgroundColor: selectRole == 'Company' ? '#e5c96c' : '#000' }

          ]}>
          <Image
            style={{ height: 80, width: 80 }}
            resizeMode='contain'
            source={selectRole == 'Company' ? require('../../assets/Cropping/Image3x-3.png') : require('../../assets/Cropping/Image3x-1.png')} />
        </TouchableOpacity>




      </View>
<View style={{flexDirection:'row',position:'absolute',bottom:0,
width:'100%',justifyContent:'center',
alignItems:'center'}}>
        <Image
            style={{ height:25, width:25,marginTop:10 }}
            resizeMode='contain'
            source={value == 'English' ? require('../../assets/Cropping/usa.png') : require('../../assets/Cropping/france.png')} />

      <Dropdown
        style={styles.dropdown}
        data={items}
        labelField="label"
        valueField="value"
        placeholder="Select Language"
        placeholderStyle={{
          color: '#e5c96c',
          fontWeight: '700'
        }}
        value={value}
        selectedTextStyle={{
          color: '#e5c96c',
          fontWeight: '300'
        }}
        iconColor='#e5c96c'
        itemTextStyle={{
          color: '#e5c96c',
          fontWeight: '700'
        }}
        onChange={item => handleChangeLanguage(item.value)}
      />

</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 30,

    height: 50,
    borderColor: 'gray',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: '#000',
    
    borderRadius: 12,
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
    height: hp(18),
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#e5c96c',
    marginTop: 10,
    width: wp(45)
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
