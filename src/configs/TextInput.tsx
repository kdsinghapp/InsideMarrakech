import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function TextInputField({ ...props }) {
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(props.hide);

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onChangeText = value => {
    setText(value);
    if (props.onChangeText) {
      props.onChangeText(value);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        {props.firstLogo && (
          <View style={styles.logoContainer}>
            <Image source={props.img} style={styles.logo} />
          </View>
        )}
        {props.County && (
          <TouchableOpacity onPress={props.PickCountry} style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>
              {props.countryCode === '' ? 'Code' : props.countryCode + '-'}
            </Text>
          </TouchableOpacity>
        )}
        <View style={[styles.textInputWrapper, { width: props.showEye ? '70%' : props.County ? '75%' : '80%' }]}>
          <TextInput
            placeholderTextColor="#000"
            style={styles.textInput}
            keyboardType={props.keyboardType}
            onChangeText={onChangeText}
            value={props.value}
            placeholder={props.placeholder}
            secureTextEntry={showPassword}
            maxLength={props.maxLength}
          />
        </View>
        {props.showEye && (
          <TouchableOpacity onPress={PasswordVisibility} style={styles.eyeIconContainer}>
            <Image source={require('../assets/Cropping/eyes4.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
        {props.lastIcon && (
          <TouchableOpacity style={styles.lastIconContainer}>
            <Image source={props.lastIcon} style={styles.lastIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: hp(7),
    borderRadius: 30,
    justifyContent: 'center',
    marginVertical: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
   // backgroundColor: '#F7F8F8',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
  },
  countryCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    lineHeight: 18,
  },
  textInputWrapper: {
    justifyContent: 'center',
    height: '100%',
  },
  textInput: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Federo-Regular',
  },
  eyeIconContainer: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  lastIconContainer: {
    height: 42,
    width: 42,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastIcon: {
    width: 24,
    height: 24,
  },
});
