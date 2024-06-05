import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch, useSelector} from 'react-redux';
import {validOtp} from '../../redux/feature/authSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';

export default function ValidOtp({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const isLoading = useSelector(state => state.auth.isLoading);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();

  const checkOtp = () => {
    const params = {
      data: {
        id: id,
        otp: value,
      },
      navigation: navigation,
    };
    dispatch(validOtp(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}>
        <Image
          source={require('../../assets/Cropping/Back_Nav2x.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{localizationStrings.otp_txt}</Text>
            <Text style={styles.headerText}>{localizationStrings.otp_txt1}</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>
             {localizationStrings.otp_input}
            </Text>
          </View>
        </View>
        <View style={styles.codeFieldContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[
                  styles.cellContainer,
                  isFocused && styles.focusCellContainer,
                ]}>
                <Text
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={checkOtp}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{localizationStrings.Submit}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    height: hp(20),
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    lineHeight: 36,
    fontFamily: 'Federo-Regular',
  },
  subHeaderContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: 'Federo-Regular',
    fontWeight: '400',
    color: '#000',
    lineHeight: 24,
  },
  codeFieldContainer: {
    height: hp(10),
    alignSelf: 'center',
    marginTop: 30,
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cellContainer: {
    backgroundColor: '#D1D1D133',
    borderRadius: 10,
    marginHorizontal: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
  },
  focusCellContainer: {
    borderColor: '#6D6EEC',
  },
  cell: {
    fontWeight: '600',
    fontSize: 24,
    fontFamily: 'Federo-Regular',
    color: '#000',
    textAlign: 'center',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#6D6EEC',
    borderRadius: 10,
  },
  submitButton: {
    height: 55,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    width: '98%',
    backgroundColor: '#000',
  },
  submitButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 25,
  },
});
