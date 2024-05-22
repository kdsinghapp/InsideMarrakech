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
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import {errorToast} from '../../configs/customToast';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../configs/Loader';
import {ResetPasswordEmail} from '../../redux/feature/authSlice';
import {CountryPicker} from 'react-native-country-codes-picker';

export default function SendOtp() {
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const isLoading = useSelector(state => state.auth.isLoading);
  const role = useSelector(state => state.auth.selectedRole);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [code, setCode] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]+$/;

  const dispatch = useDispatch();

  const Submit = () => {
    if (Email !== '' || mobile !== '') {
      if (emailRegex.test(Email)) {
        const params = {
          data: {
            identity: Email,
            type: role,
            identity_type: 'email',
          },
          navigation: navigation,
        };
        dispatch(ResetPasswordEmail(params));
      } else if (numberRegex.test(mobile)) {
        if (code === '') return errorToast('Please Select Country Code.');

        const params = {
          data: {
            identity: `${code}-${mobile}`,
            type: role,
            identity_type: 'mobile',
          },
          navigation: navigation,
        };
        dispatch(ResetPasswordEmail(params));
      } else {
        errorToast('Please enter a valid email address or number.');
      }
    } else {
      errorToast('email or number field empty');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/Cropping/Back_Nav3x.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Password Reset</Text>
            </View>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>
                Please put your mobile number to reset
              </Text>
              <Text style={styles.subHeaderText}>your password</Text>
            </View>
          </View>
          <View style={styles.tab}>
            <View style={styles.icon}>
              <Image
                source={require('../../assets/Cropping/SMS.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>SMS</Text>
              </View>
              <View style={styles.inputRow}>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Text style={[styles.countryCodeText, code !== '' && styles.countryCodeSelected]}>
                    {code !== '' ? countryCode : 'Code'}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Mobile"
                  maxLength={12}
                  onChangeText={txt => setMobile(txt)}
                  value={mobile}
                />
              </View>
            </View>
          </View>
          <View style={[styles.tab, styles.emailTab]}>
            <View style={styles.icon}>
              <Image
                source={require('../../assets/Cropping/Email_Box.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>Email</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter email"
                onChangeText={txt => setEmail(txt)}
                value={Email}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={Submit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  backButton: {
    height: hp(10),
    paddingLeft: 15,
    paddingVertical: 20,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },
  contentContainer: {
    padding: 5,
    borderRadius: 20,
  },
  headerContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 36,
  },
  subHeaderContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 24,
  },
  tab: {
    marginHorizontal: 20,
    marginTop: hp(5),
    height: hp(15),
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37.5,
  },
  iconImage: {
    height:60,
    width:60,
  },
  inputContainer: {
    width: '60%',
    marginLeft: 30,
    height: 43,
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 19.09,
    fontWeight: '700',
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'blue',
    marginRight: 5,
  },
  countryCodeSelected: {
    color: '#000',
  },
  textInput: {
    fontSize: 14,
    lineHeight: 19.09,
    fontWeight: '400',
    color: '#000',
    lineHeight: 21,
  },
  emailTab: {
    marginTop: 20,
  },
  submitButton: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(32),
    width: '90%',
    backgroundColor: '#000',
  },
  submitButtonText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
  countryPicker: {
    modal: {
      height: 400,
    },
  },
});
