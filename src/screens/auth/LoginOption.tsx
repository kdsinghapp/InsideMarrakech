import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import ScreenNameEnum from '../../routes/screenName.enum';
import { updateSelectedRole } from '../../redux/feature/authSlice';
import localizationStrings from '../../utils/Localization';

export default function LoginOption() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectRole, setSelectRole] = useState('User');
  const [value, setValue] = useState('French');
  const [items] = useState([
    { label: 'English', value: 'English', flag: require('../../assets/Cropping/usa.png') },
    { label: 'French', value: 'French', flag: require('../../assets/Cropping/france.png') },
    { label: 'Chinese', value: 'Chinese', flag: require('../../assets/Cropping/china.png') },
    { label: 'Russian', value: 'Russian', flag: require('../../assets/Cropping/russia.png') },
    { label: 'Italian', value: 'Italian', flag: require('../../assets/Cropping/italian.png') },
    { label: 'Spanish', value: 'Spanish', flag: require('../../assets/Cropping/spain.png') },
    { label: 'Japanese', value: 'Japanese', flag: require('../../assets/Cropping/japan.png') },
    
    // Add more languages here
  ]);

  useEffect(() => {
    handleChangeLanguage('French');
  }, []);

  const handleChangeLanguage = async (language) => {
    localizationStrings.setLanguage(language);
    await AsyncStorage.setItem('Lng', language);
    setValue(language);
  };

  const Role = (type) => {
    setSelectRole(type);
    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN, { role: type });
    dispatch(updateSelectedRole(type));
  };

  return (
    <ImageBackground
      source={require('../../assets/Cropping/role.png')}
      style={styles.imageBackground}>
        <View style={{alignSelf:'center',
  
        position:'absolute',bottom:hp(31)}}>
     <Text style={{fontSize:20,color:'#fff',fontWeight:'500', fontFamily: 'Federo-Regular',}}>Start the experience</Text>
     </View>
      <View style={styles.rolesContainer}>
   
        <TouchableOpacity
          onPress={() => Role('User')}
          style={[
            styles.roleButton,
            { backgroundColor: selectRole === 'User' ? '#e5c96c' : '#000' },
          ]}>
          <Image
            style={styles.roleImage}
            resizeMode="contain"
            source={
              selectRole === 'User'
                ? require('../../assets/Cropping/Image3x-2.png')
                : require('../../assets/Cropping/Image3x.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Role('Company')}
          style={[
            styles.roleButton,
            { backgroundColor: selectRole === 'Company' ? '#e5c96c' : '#000' },
          ]}>
          <Image
            style={styles.roleImage}
            resizeMode="contain"
            source={
              selectRole === 'Company'
                ? require('../../assets/Cropping/Image3x-3.png')
                : require('../../assets/Cropping/Image3x-1.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.languageContainer}>
      <Image
          style={{ height: 25, width: 25, marginTop: 10 }}
          resizeMode="contain"
          source={items.find(item => item.value === value)?.flag}
        />
        <Dropdown
          style={styles.dropdown}
          data={items}
          labelField="label"
          valueField="value"
          placeholder="Select Language"
          placeholderStyle={styles.placeholderText}
          value={value}
          selectedTextStyle={styles.selectedText}
          iconColor="#e5c96c"
          itemTextStyle={styles.itemText}
          onChange={(item) => handleChangeLanguage(item.value)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rolesContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: hp(10),
  },
  roleButton: {
    height: hp(18),
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5c96c',
    marginTop: 10,
    width: wp(45),
  },
  roleImage: {
    height: 80,
    width: 80,
  },
  languageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageImage: {
    height: 25,
    width: 25,
    marginTop: 10,
  },
  dropdown: {
    marginTop: 30,
    height: 50,
    borderColor: 'gray',
    width: '27%',
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#e5c96c',
    fontWeight: '700',
  },
  selectedText: {
    color: '#e5c96c',
    fontWeight: '300',
  },
  itemText: {
    color: '#e5c96c',
    fontWeight: '700',
  },
});
