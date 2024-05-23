import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useDispatch, useSelector} from 'react-redux';
import {errorToast} from '../../configs/customToast';
import {CreateNewPassword} from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';

export default function forgotPassword({route}) {
  const {data} = route.params;
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();
  const handlePassText = value => {
    setPassword(value);
  };
  const handleCPassText = value => {
    setConfirmPassword(value);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  };

  const createNewPassword = () => {
    if (password === ConfirmPassword) {
      if (validatePassword(password)) {
        const params = {
          data: {
            user_id: data.id,
            password: password,
          },
          navigation: navigation,
        };
console.log('===========params=========================');
console.log(params.data);
console.log('====================================');

        dispatch(CreateNewPassword(params));
      } else {
        errorToast(
          'Password must be at least 8 characters long and include at least one special character and one number',
        );
      }
    } else {
      errorToast('Password and confirm password does not match.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
       {isLoading?<Loading  />:null}

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            height: hp(20),
            marginLeft: 15,
            paddingVertical: 20,
          }}></TouchableOpacity>
        <View style={[{padding: 5, borderRadius: 20}]}>
          <View style={{marginTop: 20}}>
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: 36,
                  fontFamily: 'Federo-Regular',
                }}>
                Create New Password
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#000',
                  lineHeight: 24,
                  fontFamily: 'Federo-Regular',
                }}>
                Your new password must be different from previous used
                passwords.
              </Text>
            </View>
          </View>
          <View style={{marginTop: hp(2)}}>
            <View
              style={[
                styles.txtInput,
                {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
              ]}>
              <TextInputField
                placeholder="Password"
                onChangeText={handlePassText}
                firstLogo={true}
                img={require('../../assets/Cropping/Lock3x.png')}
                showEye={true}
              />
            </View>
            <View
              style={[
                styles.txtInput,
                {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
              ]}>
              <TextInputField
                onChangeText={handleCPassText}
                placeholder="Password"
                firstLogo={true}
                img={require('../../assets/Cropping/Lock3x.png')}
                showEye={true}
              />
            </View>
          </View>
        </View>
     <View  style={{height:hp(35),}} />
      <TouchableOpacity
        onPress={() => {
          createNewPassword()
        }}
        style={[
          styles.btn,
          {
            backgroundColor: '#294247',
            marginVertical:10
          },
        ]}>
        <Text
          style={{
            fontSize: 17,
            color: '#FFFFFF',
            fontWeight: '600',
            fontFamily: 'Federo-Regular',
            lineHeight: 25,
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  txtInput: {
    fontFamily: 'Federo-Regular',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
  },
  card: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 15,
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
    height: 55,

    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

    width: '90%',
    alignSelf: 'center',
  },
});
