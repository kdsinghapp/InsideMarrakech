import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/feature/authSlice';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {errorToast} from '../../configs/customToast';
import Loading from '../../configs/Loader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.selectedRole);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [VATnumber, setVATnumber] = useState('');
  const [CompanyAddress, setCompanyAddress] = useState('');
  const [CompanyEmail, setCompanyEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const validatePassword = password => {
    // Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };
  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleSignUp = () => {
    if (validateEmail(email)) {
      errorToast('Please enter a valid email address.');
      return;
    }

    // Password validation
    if (validatePassword(password)) {
      errorToast(
        'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      errorToast('Passwords or Confirm Password do not match.');
      return;
    }
    if (role == 'User') {
      if (
        firstName === '' &&
        lastName === '' &&
        mobile === '' &&
        email === '' &&
        password === '' &&
        role !== null
      )
        return errorToast('Please enter all fields error');
      const params = {
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile: mobile,
          password: password,
          type: role,
        },
        navigation: navigation,
      };

      dispatch(register(params));
    } else {
      if (
        CompanyAddress === '' &&
        CompanyName === '' &&
        mobile === '' &&
        VATnumber === '' &&
        CompanyEmail === '' &&
        password === '' &&
        role !== null
      )
        return errorToast('Please enter all fields error');
      const params = {
        data: {
          company_name: CompanyName,
          vat_number: VATnumber,
          email: CompanyEmail,
          mobile: mobile,
          password: password,
          type: role,
          company_address: CompanyAddress,
          company_lat: '',
          company_lon: '',
        },
        navigation: navigation,
      };

      dispatch(register(params));
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
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Enter your name, email, and password
          </Text>
          {role == 'User' && (
            <>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="First Name"
                    firstLogo={true}
                    img={require('../../assets/Cropping/User2x.png')}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Last Name"
                    firstLogo={true}
                    img={require('../../assets/Cropping/User2x.png')}
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Email Address"
                    firstLogo={true}
                    img={require('../../assets/Cropping/Email2x.png')}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Mobile Number"
                    firstLogo={true}
                    img={require('../../assets/Cropping/Phone2x.png')}
                    value={mobile}
                    onChangeText={setMobile}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Password"
                    firstLogo={true}
                    img={require('../../assets/Cropping/Lock2x.png')}
                    showEye={true}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
            </>
          )}
          {role == 'Company' && (
            <>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Company Name"
                    firstLogo={false}
                    img={require('../../assets/Cropping/User2x.png')}
                    value={firstName}
                    onChangeText={setCompanyName}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="VAT Number"
                    firstLogo={false}
                    img={require('../../assets/Cropping/User2x.png')}
                    value={lastName}
                    onChangeText={setVATnumber}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Company Address"
                    firstLogo={false}
                    img={require('../../assets/Cropping/Email2x.png')}
                    value={email}
                    onChangeText={setCompanyAddress}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Mobile Number"
                    firstLogo={false}
                    img={require('../../assets/Cropping/Phone2x.png')}
                    value={mobile}
                    onChangeText={setMobile}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Company email"
                    firstLogo={false}
                    img={require('../../assets/Cropping/Phone2x.png')}
                    value={mobile}
                    onChangeText={setCompanyEmail}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Password"
                    firstLogo={false}
                    img={require('../../assets/Cropping/Lock2x.png')}
                    showEye={true}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.txtInput, styles.inputBackground]}>
                  <TextInputField
                    placeholder="Confirm Password"
                    firstLogo={false}
                    img={require('../../assets/Cropping/Lock2x.png')}
                    showEye={true}
                    value={confirmPassword}
                    onChangeText={setconfirmPassword}
                  />
                </View>
              </View>
            </>
          )}
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.btn, styles.signUpButton]}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)}>
              <Text style={[styles.signInText, styles.signInLink]}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: role == 'Company' ? hp(5) : 10}} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    height: 180,
    width: 180,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Federo-Regular',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 36,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 18,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  txtInput: {
    borderWidth: 1,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  inputBackground: {
    backgroundColor: '#FFFFFF',
  },
  btn: {
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#352C48',
  },
  signUpButton: {
    marginBottom: 20,
  },
  btnText: {
    fontFamily: 'Federo-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    lineHeight: 18,
  },
  signInLink: {
    marginLeft: 5,
    color: '#27dbdb',
  },
});
