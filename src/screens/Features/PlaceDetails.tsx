import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GoldRight from '../../assets/svg/GoldRight.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import HTML from 'react-native-render-html';

import Pin from '../../assets/svg/BlackPin.svg';
import Call from '../../assets/svg/call.svg';
import Chat from '../../assets/svg/chat.svg';
import Star from '../../assets/svg/Star.svg';
import { styles } from '../../configs/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
import DateModal from '../Modal/DateModal';
import MenuModal from '../Modal/MenuModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_chat_user,
  delete_property,
  get_all_property,
  get_company_all_property,
  get_property_detail,
  get_property_menu,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import Rating from '../../configs/Ratting';
import localizationStrings from '../../utils/Localization';
import { WebView } from 'react-native-webview';

export default function PlaceDetails() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMenuVisible, setmodalMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const propertDetails = useSelector(state => state.feature.propertyDetail);
  const isFocuse = useIsFocused();
  const [webViewHeight, setWebViewHeight] = useState(0);



  function isHTML(str) {
    const htmlPattern = /<\/?[a-z][\s\S]*>/i;
    return htmlPattern.test(str);
  }
  useEffect(() => {
    get_property();
    dispatch(get_company_all_property());
  }, [item, user, isFocuse]);

  const get_property = () => {
    const params = {
      id: item.id,
    };

    dispatch(get_property_detail(params));
  };

  const tagsStyles = {
    p: {
      fontFamily: 'Federo-Regular',
    },
    em: {
      fontFamily: 'Federo-Regular',
    },
    strong: {
      fontFamily: 'Federo-Regular',
    },
  };

  const timeFormate = utcDateString => {
    const date = new Date(utcDateString);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      // Convert UTC date to local time
      const localTimeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      return localTimeString;
    } else {

    }
  };

  const DeleteProperty = async () => {
    const params = {
      property_id: item.id,
      company_id: user?.id,
      navigation: navigation
    };

    dispatch(delete_property(params));
  };
  const formatTimes = () => {
    const [startTimeStr, endTimeStr] = propertDetails?.opening_hours?.split('/');
    const formattedStartTime = timeFormate(startTimeStr);
    const formattedEndTime = timeFormate(endTimeStr);
    return {
      startTime: formattedStartTime,
      endTime: formattedEndTime
    };
  };
  const Add_chatUser = async () => {


    const params = {
      data: {
        user_id: user?.id,
        company_id: propertDetails?.company_id
      },
      navigation: navigation
    }

    dispatch(add_chat_user(params))
  }
  const make_call = (Number) => {

    RNImmediatePhoneCall.immediatePhoneCall(Number);
  }
  const onWebViewMessage = event => {
    console.log('event.nativeEvent.data', event.nativeEvent.data);

    setWebViewHeight(Number(event.nativeEvent.data));
  };
  // Wrap the HTML content with meta viewport tag for proper scaling
  const generateHtmlContent = content => `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Federo', sans-serif;
          font-size:30px;
          color: #000;
          margin:10;
          padding: 0;
        }
      </style>
    </head>
    <body>
      ${content}
  
    </body>
    </html>
  `;


  console.log(webViewHeight);


  return (
    <View style={localStyles.container}>
      {isLoading ? <Loading /> : null}
      {propertDetails.document_gallery ?
        <ScrollView showsVerticalScrollIndicator={false}>

          {propertDetails && (
            <ImageBackground
              source={{
                uri:
                  propertDetails?.main_image
              }}
              style={localStyles.imageBackground}>

            </ImageBackground>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ position: 'absolute', top:45, left: 15 }}
          >
            <GoldRight width={30} height={30} />
          </TouchableOpacity>
          <View style={localStyles.contentContainer}>
            <View style={localStyles.titleContainer}>
              <Text style={localStyles.titleText}>{propertDetails?.name}</Text>
            </View>
            <View style={localStyles.addressContainer}>
              <Pin />
              <Text style={[localStyles.addressText, { marginLeft: 5 }]}>
                {propertDetails?.address}
              </Text>
            </View>

            <View style={localStyles.star}>

              <View style={localStyles.starsContainer}>
                <Rating rating={propertDetails?.rating} />


                <Text style={localStyles.ratingText}>{propertDetails?.rating}</Text>
              </View>

              <Text style={localStyles.priceText}>
                {localizationStrings.price} {propertDetails?.amount}
              </Text>
            </View>

            <View style={localStyles.buttonsContainer}>
              {user?.type == 'User' ? (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={localStyles.btn}>
                  <Text style={localStyles.btnText}>{localizationStrings.book}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.updateProperty, {
                      item: propertDetails,
                    });
                  }}
                  style={localStyles.btn}>
                  <Text style={localStyles.btnText}>{localizationStrings.edit}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setmodalMenuVisible(true);
                }}
                style={localStyles.btn}>
                <Text style={localStyles.btnText}>{localizationStrings.menu}</Text>
              </TouchableOpacity>
            </View>

            <View style={localStyles.galleryHeaderContainer}>
              <Text style={localStyles.galleryHeaderText}>{localizationStrings.G_photo}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNameEnum.Gallery_Screen, {
                    item: propertDetails?.document_gallery
                  })
                }}
              >
                <Text style={localStyles.seeAllText}>{localizationStrings.see_a}</Text>
              </TouchableOpacity>

            </View>

            <View style={localStyles.galleryContainer}>
              <FlatList
                data={propertDetails?.document_gallery}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      resizeMode="contain"
                      style={localStyles.galleryImage}
                    />
                  </View>
                )}
              />
            </View>

            {user?.type == 'User' && (
              <View style={localStyles.contactContainer}>
                <TouchableOpacity
                  onPress={() => {
                    make_call(propertDetails?.book_online_mobile_number)
                  }}
                  style={localStyles.contactButton}>
                  <Call />
                  <Text style={localStyles.contactButtonText}>
                    {localizationStrings.B_O_call}:
                    {propertDetails?.book_online_mobile_number}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Add_chatUser()
                  }}
                  style={[localStyles.contactButton, localStyles.chatButton]}>
                  <Chat />
                  <Text style={localStyles.contactButtonText}>{localizationStrings.c_now}</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={localStyles.descriptionContainer}>
              <Text style={localStyles.sectionTitle}>{localizationStrings.title}</Text>
              <Text style={[localStyles.sectionTitle, { marginTop: 10 }]}>
                {propertDetails?.title}
              </Text>
              <Text style={[localStyles.sectionTitle, { marginTop: 20 }]}>
                {localizationStrings.Description}
              </Text>
              <View style={{}}>

                {isHTML(propertDetails?.description) &&

                  <WebView
                    source={{ html: generateHtmlContent(propertDetails?.description) }}
                    style={{ height: webViewHeight > 900 ? webViewHeight / 2 : webViewHeight < 500 ? webViewHeight : webViewHeight - 200, width: Dimensions.get('window').width - 10 }}
                    onMessage={onWebViewMessage}
                    javaScriptEnabled
                    injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"

                  />
                  // <HTML source={{ html: generateHtmlContent(propertDetails?.description) }}/>
                }
                {!isHTML(propertDetails?.description) &&
                  <Text style={[localStyles.descriptionText, { marginTop: 10 }]}>
                    {propertDetails?.description}
                  </Text>
                }
              </View>
            </View>
          </View>

          <View style={localStyles.openingHoursContainer}>
            <Text style={localStyles.sectionTitle}>{localizationStrings.O_hours}</Text>

            <Text style={localStyles.openingHoursText}>
              {propertDetails?.lunch_start} to {propertDetails?.lunch_end}
            </Text>
          </View>


          <View style={[localStyles.sectionContainer, { marginTop: 20 }]}>
            <Text style={localStyles.sectionTitle}>{localizationStrings.h_t_get}</Text>
            <Text style={localStyles.sectionTitle}>{propertDetails?.title}</Text>
          </View>
          {propertDetails?.lat != '' && propertDetails?.lon != '' && <ImageBackground
            style={localStyles.mapImageBackground}
            source={require('../../assets/Cropping/map.png')}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.MAP_SCREEN, { item: propertDetails }
                );
              }}

              style={localStyles.mapButton}>
              <Text style={localStyles.mapButtonText}>{localizationStrings.O_map}</Text>
            </TouchableOpacity>
          </ImageBackground>}

          {user?.type == 'Company' && <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete Property',
                'Are you sure you want to delete this property?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => DeleteProperty(),
                    style: 'destructive',
                  },
                ],
                { cancelable: false },
              );
            }}
            style={{ alignSelf: 'center', marginTop: 20 }}>
            <Text style={{ color: 'red' }}>Delete Property</Text>
          </TouchableOpacity>
          }
          <View style={localStyles.bottomSpace} />
          <DateModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            data={item}
          />
          <MenuModal
            visible={modalMenuVisible}
            onClose={() => setmodalMenuVisible(false)}
            data={propertDetails}
          />
        </ScrollView>
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#000', fontSize: 16 }}>No Details</Text>
        </View>
      }
    </View>
  );
}

const localStyles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageBackground: {
    height: hp(25),
  },
  goBackButton: {

    position: 'absolute',
    top: 15,
    left: 15
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontFamily: 'Federo-Regular',
    fontSize: 20,
    color: '#000',
  },
  addressContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    color: '#000',
  },
  star: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    color: '#000',
    fontWeight: '800',
    marginLeft: 20
  },
  priceText: {
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
  btn: {
    borderWidth: 1,
    height: 45,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
  },
  galleryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  galleryHeaderText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  seeAllText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  galleryImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  contactContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  contactButton: {
    borderWidth: 1,
    borderRadius: 30,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contactButtonText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
    fontWeight: '500',
    fontFamily: 'Federo-Regular',
  },
  chatButton: {
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  descriptionText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
  },
  bookButton: {
    borderWidth: 1,
    borderRadius: 30,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  bookButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: '400',
  },
  openingHoursContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  openingHoursText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    marginTop: 10,
    color: '#777777',
    fontWeight: '400',
  },
  scheduleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  scheduleText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    color: '#777777',
    marginTop: 10,
    fontWeight: '400',
  },
  exploreContainer: {
    padding: 5,
    height: hp(25),
    width: hp(45),
    marginLeft: 15,
  },
  exploreImageBackground: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  exploreTextContainer: {
    marginTop: 30,
  },
  exploreTitle: {
    color: '#fff',
    width: '60%',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  exploreSubtitle: {
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  viewButton: {
    backgroundColor: '#FFF',
    width: '20%',
    position: 'absolute',
    bottom: 40,
    left: 20,
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Federo-Regular',
  },
  sectionContainer: {
    marginHorizontal: 20,
  },
  mapImageBackground: {
    height: hp(30),
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Federo-Regular',
  },
  bottomSpace: {
    height: hp(5),
  },
});

const GalleryData = [
  {
    Img: require('../../assets/Cropping/img4.png'),
  },
  {
    Img: require('../../assets/Cropping/img5.png'),
  },
  {
    Img: require('../../assets/Cropping/img6.png'),
  },
  {
    Img: require('../../assets/Cropping/img4.png'),
  },
  {
    Img: require('../../assets/Cropping/img5.png'),
  },
  {
    Img: require('../../assets/Cropping/img6.png'),
  },
];
