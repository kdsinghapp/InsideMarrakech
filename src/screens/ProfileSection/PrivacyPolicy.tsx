import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_privacy_policy } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import WebView from 'react-native-webview';

export default function PrivacyPolicy() {
  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const Policy = useSelector(state => state.feature.PrivacyPolicy);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_privacy_policy());
  }, [isFocuse]);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ProfileHeader title="Privacy Policy" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/Cropping/PrivacyPolicy.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {Policy && (
          <View style={styles.policyContainer}>
            <Text style={styles.policyText}>{Policy[0]?.description.replace(/<\/?p>/g, '')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  imageContainer: {
    height: hp(30),
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '80%',
    width: '80%',
  },
  policyContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  policyText: {
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
    lineHeight: 18,
    fontSize: 12,
    color: '#000',
  },

  btn: {
    borderWidth: 1,
    height: 60,
    marginHorizontal: '9%',
    position: 'absolute',
    width: '91%',
    alignSelf: 'center',
    bottom: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1D0B38',
  },
  txtInput: {
    flexDirection: 'row',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
