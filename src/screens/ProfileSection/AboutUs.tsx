
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
      import { get_about_us, get_terms_conditions } from '../../redux/feature/featuresSlice';
      import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';
      
      
      export default function AboutUs() {
      
        const isFocuse = useIsFocused();
        const navigation = useNavigation();
      
        const AboutUs = useSelector(state => state.feature.AboutUs);
        const isLoading = useSelector(state => state.feature.isLoading);
        const dispatch = useDispatch();
      
        useEffect(() => {
          dispatch(get_about_us());
        }, [isFocuse]);
      
      
        return (
          <View style={styles.container}>
            {isLoading ? <Loading /> : null}
            <View style={{height:Platform.OS !== 'android'?20:5,}} />
        <ProfileHeader title={localizationStrings.about_us} width={25} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/Cropping/AboutsUs3x.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {AboutUs && (
            <View style={styles.descriptionContainer}>
                <Text style={{fontSize:18,color:'#000',fontWeight:'600',marginVertical:10,  fontFamily: 'Federo-Regular',}}>{localizationStrings.about_us}</Text>
              <Text style={styles.description}>
                {AboutUs[0]?.description.replace(/<\/?p>/g, '')}
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
      