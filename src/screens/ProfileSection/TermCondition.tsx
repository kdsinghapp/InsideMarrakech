import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ProfileHeader from '../../configs/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_terms_conditions } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';

import { WebView } from 'react-native-webview';

export default function TermCondition() {

  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const Term = useSelector(state => state.feature.TermsCondition);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_terms_conditions());
  }, [isFocuse]);

  const generateHtmlContent = content => `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Federo', sans-serif;
        font-size:36px;
        color: #000;
      }
    </style>
  </head>
  <body>
    ${content}
  </body>
  </html>
`;

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <View style={{height:Platform.OS !== 'android'?20:5,}} />
  <ProfileHeader title={localizationStrings.tern_con} width={13} />
  
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/Cropping/TermsConditions.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
 

{Term && Term[0]?.description && (
            <WebView
              source={{ html: generateHtmlContent(Term[0]?.description) }}
            />
          )}

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
