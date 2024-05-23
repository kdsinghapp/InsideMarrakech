import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import GoldRight from '../../assets/svg/GoldRight.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import Pin from '../../assets/svg/BlackPin.svg';
import Call from '../../assets/svg/call.svg';
import Chat from '../../assets/svg/chat.svg';
import Star from '../../assets/svg/Star.svg';
import { styles } from '../../configs/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function PlaceDetails() {
  const navigation = useNavigation();
  return (
    <View style={localStyles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/Cropping/img1.png')}
          style={localStyles.imageBackground}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={localStyles.goBackButton}>
            <GoldRight />
          </TouchableOpacity>
        </ImageBackground>

        <View style={localStyles.contentContainer}>
          <View style={localStyles.titleContainer}>
            <Text style={localStyles.titleText}>Marrakech Quad Biking</Text>
          </View>
          <View style={localStyles.addressContainer}>
            <Pin />
            <Text style={localStyles.addressText}>192 Rue Tachenbacht, Marrakech 40000</Text>
          </View>

          <View style={localStyles.star}>
            <View style={localStyles.starsContainer}>
              <View style={localStyles.stars}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </View>
              <Text style={localStyles.ratingText}>5.0</Text>
            </View>

            <Text style={localStyles.priceText}>From MAD 165,3</Text>
          </View>

          <View style={localStyles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.BOOKING_DETAILS);
              }}
              style={localStyles.btn}>
              <Text style={localStyles.btnText}>BOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.btn}>
              <Text style={localStyles.btnText}>MENU</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.galleryHeaderContainer}>
            <Text style={localStyles.galleryHeaderText}>Gallery Photos</Text>
            <TouchableOpacity>
              <Text style={localStyles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.galleryContainer}>
            <FlatList
              data={GalleryData}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={item.Img}
                    resizeMode="contain"
                    style={localStyles.galleryImage}
                  />
                </View>
              )}
            />
          </View>

          <View style={localStyles.contactContainer}>
            <TouchableOpacity style={localStyles.contactButton}>
              <Call />
              <Text style={localStyles.contactButtonText}>
                Book online or call: +212 679-419149
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.CHAT_CONTACT_SCREEN);
              }}
              style={[localStyles.contactButton, localStyles.chatButton]}>
              <Chat />
              <Text style={localStyles.contactButtonText}>Chat now</Text>
            </TouchableOpacity>
          </View>

          <View style={localStyles.descriptionContainer}>
            <Text style={localStyles.sectionTitle}>Agafay Desert</Text>
            <Text style={localStyles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur. A purus parturient sed
              enim erat. Mattis eget tincidunt dolor consequat molestie ante.
              Nibh consequat at sed magna turpis lectus. Mi urna libero sit
              pellentesque orci in lectus. Eu mauris pretium elit fusce laoreet
              vestibulum interdum amet sagittis. Adipiscing at sit mi purus
              sodales. Ut luctus facilisis imperdiet massa purus nulla iaculis
              consectetur in. Scelerisque consectetur euismod ultrices nibh
              consectetur massa sed eu. Faucibus cras blandit cras.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={localStyles.bookButton}>
          <Text style={localStyles.bookButtonText}>BOOK</Text>
        </TouchableOpacity>
        <View style={localStyles.openingHoursContainer}>
          <Text style={localStyles.sectionTitle}>Opening hours</Text>
          <Text style={localStyles.openingHoursText}>Open 7 days a week</Text>
        </View>
        <View style={localStyles.scheduleContainer}>
          <Text style={localStyles.scheduleText}>Lunch</Text>
          <Text style={localStyles.scheduleText}>12h-15h</Text>
        </View>
        <View style={localStyles.scheduleContainer}>
          <Text style={localStyles.scheduleText}>Dinner</Text>
          <Text style={localStyles.scheduleText}>7pm-2am</Text>
        </View>
        <View style={localStyles.exploreContainer}>
          <ImageBackground
            source={require('../../assets/Cropping/img2.png')}
            style={localStyles.exploreImageBackground}
            resizeMode="contain">
            <View style={localStyles.exploreTextContainer}>
              <Text style={localStyles.exploreTitle}>
                Exploring the Surroundings of Essaouira
              </Text>
              <Text style={localStyles.exploreSubtitle}>
                By Car, Motorbike, Motorhome, Coach, By Bike
              </Text>
            </View>

            <TouchableOpacity style={localStyles.viewButton}>
              <Text style={localStyles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={localStyles.sectionContainer}>
          <Text style={localStyles.sectionTitle}>How to get to</Text>
          <Text style={localStyles.sectionTitle}>Agafay Desert</Text>
        </View>
        <ImageBackground
          style={localStyles.mapImageBackground}
          source={require('../../assets/Cropping/map.png')}>
          <TouchableOpacity style={localStyles.mapButton}>
            <Text style={localStyles.mapButtonText}>OPEN IN MAPS</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={localStyles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageBackground: {
    height: hp(25),
  },
  goBackButton: {
    marginTop: 20,
    marginLeft: 15,
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
