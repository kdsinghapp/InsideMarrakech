import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  const role = useSelector(state => state.auth.selectedRole);

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const [Number, setNumber] = useState(false);
console.log(isLoading);

  const isFocus = useIsFocused();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]+$/;
  const stringRegex = /^[a-zA-Z\s]*$/;
  const navigation = useNavigation();

  const handleIdentityText = value => {
    setIdentity(value);
    if (identity == '') {
      setNumber(false);
    }

    if (numberRegex.test(identity)) {
      setNumber(true);
    } else if (emailRegex.test(identity)) {
      setNumber(false);
    } else if (stringRegex.test(identity)) {
      setNumber(false);
    }
  };
  const handlePassText = value => {
    setPassword(value);
  };
  const setCountry = value => {
    setShow(true);
  };


  const _get_lan = async () => {
    const Language = await AsyncStorage.getItem("Lng")
    localizationStrings.setLanguage(Language == null ? "French" : Language);
}
  const Login = () => {
    _get_lan()
    if (password.length < 8) {
      return errorToast('The password field must be at least 8 characters.');
    } else {
      if (identity != '' && password != '') {
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
          if (code == '') return errorToast('Please Select Country Code.');
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
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView>
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
              County={Number}
              countryCode={countryCode}
              PickCountry={setCountry}
              onChangeText={handleIdentityText}
              placeholder={localizationStrings.Placeholder_email}
              firstLogo={true}
              img={
                Number
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
        {/* <View style={styles.orContainer}>
          <Text style={styles.orText}>{localizationStrings.or}</Text>
        </View> */}
        {/* <TouchableOpacity style={styles.googleSignInButton}>
          <Gicon />
          <Text style={styles.googleSignInText}>{localizationStrings.signup_google}</Text>
        </TouchableOpacity> */}
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
  logoContainer: {
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logo: {
    height: 180,
    width: 180,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Federo-Regular',
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    lineHeight: 36,
  },
  subHeaderText: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 18,
    marginTop: 20,
  },
  inputWrapper: {
    marginTop: hp(5),
  },
  txtInput: {
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
  },
  passwordInput: {
    marginTop: 20,
    paddingRight: 10,
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
    fontSize: 14,
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontWeight: '600',
    lineHeight: 18,
  },
  loginButtonContainer: {
    marginTop: hp(3),
  },
  btn: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  signUpText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: 'Federo-Regular',
  },
  orContainer: {
    justifyContent: 'center',
    height: 60,
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  googleSignInText: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 15,
  },
  countryPicker: {
    modal: {
      height: 400,
    },
  },
});
