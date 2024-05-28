import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_terms_conditions } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';


export default function TermCondition() {

  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const Term = useSelector(state => state.feature.TermsCondition);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_terms_conditions());
  }, [isFocuse]);


  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
  <ProfileHeader title={'Terms and Conditions'} width={13} />
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/Cropping/TermsConditions.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
    {Term && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {Term[0]?.description.replace(/<\/?p>/g, '')}
        </Text>
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
  descriptionContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  description: {
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
    lineHeight: 18,
    fontSize: 12,
    color: '#000',
  },
});
