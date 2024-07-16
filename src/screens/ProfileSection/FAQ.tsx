

    import {
        View,
        Text,
        Image,
        StyleSheet,
        ScrollView,
        TouchableOpacity,
        FlatList,
        Platform,
      } from 'react-native';
      import React, {useEffect, useState} from 'react';
      import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
      import {useIsFocused, useNavigation} from '@react-navigation/native';
      import ProfileHeader from '../../configs/ProfileHeader';
      import { useDispatch, useSelector } from 'react-redux';
      import { get_about_us, get_faq, get_terms_conditions } from '../../redux/feature/featuresSlice';
      import Loading from '../../configs/Loader';
      import Collapsible from 'react-native-collapsible';
import localizationStrings from '../../utils/Localization';
      
      export default function FAQ() {
      
        const isFocuse = useIsFocused();
        const navigation = useNavigation();
      
        const FAQ = useSelector(state => state.feature.FAQ);
        const isLoading = useSelector(state => state.feature.isLoading);
        const dispatch = useDispatch();
      
        useEffect(() => {
          dispatch(get_faq());
        }, [isFocuse]);
      
        const [activeSections, setActiveSections] = useState([]);

        const toggleSection = (index) => {
          const isActive = activeSections.includes(index);
          setActiveSections(isActive ? activeSections.filter(i => i !== index) : [...activeSections, index]);
        };
      
        const renderFAQ = ({ item, index }) => (
          <View>
            <TouchableOpacity onPress={() => toggleSection(index)} 
            style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Image source={require('../../assets/Cropping/arrowdown2x.png')}  style={{height:25,width:25}}/>
             
            </TouchableOpacity>
            <Collapsible collapsed={!activeSections.includes(index)}>
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            </Collapsible>
          </View>
        );
      
        return (
          <View style={styles.container}>
            {isLoading ? <Loading /> : null}
            <View style={{height:Platform.OS !== 'android'?20:5,}} />
        <ProfileHeader title={localizationStrings.faq} width={30} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/Cropping/FAQ.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View  style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:22,fontWeight:'600',color:'#000', fontFamily: 'Federo-Regular',}}>{localizationStrings.faq}</Text>
            <Text style={{fontSize:16,fontWeight:'600',color:'#000',marginTop:10, fontFamily: 'Federo-Regular',}}>{localizationStrings.faq_txt}</Text>
          </View>
          <View  style={{marginTop:30}}>
          <FlatList
        data={FAQ}
        renderItem={renderFAQ}
        keyExtractor={(item, index) => index.toString()}
      />
         </View>
        </ScrollView>
      </View>
      
        );
      }
      
      const styles = StyleSheet.create({
        questionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
           marginHorizontal:20,
            backgroundColor:'#e6eff5',
            paddingHorizontal:10,
            borderRadius:10,
            marginVertical:10
          },
          question: {
            fontSize: 16,
            fontWeight: '600',
            width:'90%',
            color:'#f06e6e',
            fontFamily: 'Federo-Regular',
          },
          answerContainer: {
            paddingVertical: 10,
            marginHorizontal:20
          },
          answer: {
            fontSize: 14,
            color: '#555',
            fontFamily: 'Federo-Regular',
          },
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
      