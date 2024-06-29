import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CountryPicker } from 'react-native-country-codes-picker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TextInputField from '../../configs/TextInput';
import Gicon from '../../assets/svg/Gicon.svg';
import ScreenNameEnum from '../../routes/screenName.enum';
import { login } from '../../redux/feature/authSlice';
import { errorToast } from '../../configs/customToast';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const role = useSelector(state => state.auth.selectedRole);

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]+$/;
  const stringRegex = /^[a-zA-Z\s]*$/;

  const handleIdentityText = useCallback((value) => {
    setIdentity(value);
    if (value === '') {
      setNumber(false);
    } else if (numberRegex.test(value)) {
      setNumber(true);
    } else if (emailRegex.test(value)) {
      setNumber(false);
    } else if (stringRegex.test(value)) {
      setNumber(false);
    }
  }, [emailRegex, numberRegex, stringRegex]);

  const handlePassText = useCallback((value) => {
    setPassword(value);
  }, []);

  const setCountry = useCallback(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const _get_lan = async () => {
      const Language = await AsyncStorage.getItem("Lng");
      localizationStrings.setLanguage(Language == null ? "French" : Language);
    };

    _get_lan();
  }, [isFocus]);

  const Login = useCallback(() => {
    if (password.length < 8) {
      return errorToast('The password field must be at least 8 characters.');
    } else {
      if (identity !== '' && password !== '') {
        if (emailRegex.test(identity)) {
          console.log('Login with Email');
          const passwordWithoutSpaces = password.replace(/\s/g, '');

          const params = {
            data: {
              email_mobile: identity,
              type: role,
              password: passwordWithoutSpaces,
            },
            navigation: navigation,
          };

          dispatch(login(params));
        } else if (numberRegex.test(identity)) {
          console.log('Login with Mobile ');
          if (code === '') return errorToast('Please Select Country Code.');
          const passwordWithoutSpaces = password.replace(/\s/g, '');

          const params = {
            data: {
              identity: code + '-' + identity,
              password: passwordWithoutSpaces,
            },
            navigation: navigation,
          };

          dispatch(login(params));
        } else {
          errorToast('Please enter a valid email address or number.');
        }
      } else {
        errorToast('email or number password field empty');
      }
    }
  }, [identity, password, code, emailRegex, numberRegex, role, dispatch, navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Cropping/Logo3x.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{localizationStrings.login}</Text>
            <Text style={styles.subHeaderText}>{localizationStrings.login_Txt}</Text>
          </View>
          <View style={styles.inputWrapper}>
            <View style={[styles.txtInput, { backgroundColor: '#FFFFFF' }]}>
              <TextInputField
                County={number}
                countryCode={countryCode}
                PickCountry={setCountry}
                onChangeText={handleIdentityText}
                placeholder={localizationStrings.Placeholder_email}
                firstLogo={true}
                img={
                  number
                    ? require('../../assets/Cropping/Phone2x.png')
                    : require('../../assets/Cropping/Email3x.png')
                }
              />
            </View>
            <View style={[styles.txtInput, styles.passwordInput]}>
              <TextInputField
                onChangeText={handlePassText}
                placeholder={localizationStrings.Placeholder_password}
                firstLogo={true}
                showEye={true}
                img={require('../../assets/Cropping/Lock3x.png')}
              />
            </View>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.SENT_OTP);
              }}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>{localizationStrings.forgot}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity
              onPress={Login}
              style={[styles.btn, { backgroundColor: '#352C48' }]}
            >
              <Text style={styles.loginButtonText}>{localizationStrings.login?.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN);
              }}
            >
              <Text style={styles.signUpText}>{localizationStrings.signup_msg}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CountryPicker
          show={show}
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setCode(item.code);
            setShow(false);
          }}
          popularCountries={['en', 'in', 'pl']}
          style={styles.countryPicker}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 10,
  },
  logo: {
    height: wp(40),
    width: wp(40),
  },
  formContainer: {
    paddingHorizontal: wp(5),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Federo-Regular',
    fontSize: wp(6),
    fontWeight: '500',
    color: '#000',
    lineHeight: wp(9),
  },
  subHeaderText: {
    fontFamily: 'Federo-Regular',
    fontSize: wp(4),
    fontWeight: '400',
    color: '#000',
    lineHeight: wp(5),
    marginTop: 20,
  },
  inputWrapper: {
    marginTop: hp(5),
  },
  txtInput: {
    height: hp(7),
    marginHorizontal: wp(5),
    borderRadius: hp(3.5),
    justifyContent: 'center',
    paddingLeft: wp(2),
    borderWidth: 1,
  },
  passwordInput: {
    marginTop: hp(2),
    paddingRight: wp(2),
  },
  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  forgotPasswordButton: {
    borderBottomWidth: 0.5,
    borderColor: '#FFF',
  },
  forgotPasswordText: {
    fontSize: wp(3.5),
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontWeight: '600',
    lineHeight: wp(4.5),
  },
  loginButtonContainer: {
    marginTop: hp(3),
  },
  btn: {
    height: hp(7),
    marginHorizontal: wp(5),
    borderRadius: hp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: wp(4),
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: wp(6),
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  signUpText: {
    fontSize: wp(3.5),
    color: '#000',
    fontWeight: '600',
    lineHeight: wp(4.5),
    fontFamily: 'Federo-Regular',
  },
  countryPicker: {
    modal: {
      height: 400,
    },
  },
});
