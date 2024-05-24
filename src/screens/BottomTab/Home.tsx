import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import Header from '../../configs/Header';
import Searchbar from '../../configs/Searchbar';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BlackDown from '../../assets/svg/BlackDown.svg';
import Pin from '../../assets/svg/Pin.svg';
import User from '../../assets/svg/user.svg';
import Down from '../../assets/svg/BlackDown.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import DateModal from '../Modal/DateModal';
import {useDispatch, useSelector} from 'react-redux';
import {get_category} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();

  const category = useSelector(state => state.feature.CategoryList);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category());
  }, [isFocused]);

  const navigation = useNavigation();

  const renderList = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.PLACE_DETAILS);
      }}
      style={[styles.shadow, styles.itemContainer]}>
        <Image source={item.img} style={styles.itemImage} resizeMode="cover" />
        {user?.type === 'Company' &&
        <TouchableOpacity style={{ position: 'absolute',
        right:20,
        top:20,}}>
          <Image  source={require('../../assets/Cropping/Icon.png')}  style={{
           
            
            height:40,width:40}}/>
          </TouchableOpacity>

        }

      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.detailsContainer}>
        <Pin />
        <Text style={styles.itemDetails}>{item.details}</Text>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.itemUser}>{item.user}</Text>
          <User />
          <Down />
        </View>

        <TouchableOpacity
         
          style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={item.subTime}
        horizontal
        renderItem={({item, index}) => (
          <View style={styles.subTimeContainer}>
            <Text style={styles.subTimeText}>{item.time}</Text>
          </View>
        )}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        {user?.type === 'User' && (
          <>
            <Searchbar
              setModal={() => {
                setIsVisible(true);
              }}
            />
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryHeaderText}>Category</Text>
                <BlackDown />
              </View>
              <View style={styles.categoryList}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={category}
                  horizontal
                  renderItem={({item, index}) => (
                    <TouchableOpacity style={styles.categoryItem}>
                      <Image
                        resizeMode="contain"
                        source={{uri: item.image}}
                        style={styles.categoryItemImage}
                      />
                      <Text style={styles.categoryItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={styles.bannerContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={Banner}
                horizontal
                renderItem={({item, index}) => (
                  <View style={styles.bannerItem}>
                    <ImageBackground
                      source={item.img}
                      style={styles.bannerImage}
                      resizeMode="contain">
                      <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>
                          Exploring the Surroundings of Essaouira
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                          By Car, Motorbike, Motorhome, Coach, By Bike
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>View</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                )}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={Post}
              renderItem={renderList}
            />
            <Modal visible={isVisible} animationType="slide" transparent={true}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}
                style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Time Range</Text>
                  </View>
                  <View style={styles.modalSection}>
                    <View style={styles.timeContainer}>
                      <View style={styles.timeOption}>
                        <Text style={styles.timeText}>1 Hours</Text>
                      </View>
                      <View style={styles.timeOption}>
                        <Text style={styles.timeText}>1 Hours</Text>
                      </View>
                      <View style={styles.timeOption}>
                        <Text style={styles.timeText}>1 Hours</Text>
                      </View>
                      <View style={styles.timeOption}>
                        <Text style={styles.timeText}>1 Hours</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Person</Text>
                  </View>
                  <View style={styles.modalSection}>
                    <View style={styles.guestsContainer}>
                      <View style={styles.guestOption}>
                        <Text style={styles.guestText}>1</Text>
                        <Image
                          source={require('../../assets/Cropping/Person2x.png')}
                          style={styles.personIcon}
                        />
                      </View>
                      <View style={styles.guestOption}>
                        <Text style={styles.guestText}>1</Text>
                        <Image
                          source={require('../../assets/Cropping/Person2x.png')}
                          style={styles.personIcon}
                        />
                      </View>
                      <View style={styles.guestOption}>
                        <Text style={styles.guestText}>1</Text>
                        <Image
                          source={require('../../assets/Cropping/Person2x.png')}
                          style={styles.personIcon}
                        />
                      </View>
                      <View style={styles.guestOption}>
                        <Text style={styles.guestText}>1</Text>
                        <Image
                          source={require('../../assets/Cropping/Person2x.png')}
                          style={styles.personIcon}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>Budget Range</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
                    }}
                    style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
           
          </>
        )}
        {user?.type === 'Company' && (
          <>
              <View style={styles.title}>
          <Text style={styles.titleText}>My Activity </Text>
        </View>
            <View style={styles.bannerContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={Banner}
                horizontal
                renderItem={({item, index}) => (
                  <View style={styles.bannerItem}>
                    <ImageBackground
                      source={item.img}
                      style={styles.bannerImage}
                      resizeMode="contain">
                      <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>
                          Exploring the Surroundings of Essaouira
                        </Text>
                        <Text style={styles.bannerSubtitle}>
                          By Car, Motorbike, Motorhome, Coach, By Bike
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>View</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                )}
              />
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={Post}
              renderItem={renderList}
            />
     
            
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
  
  },
  titleText: {
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontSize: 20,
  },
  guestsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: hp(8),
    marginVertical: 10,
    flexDirection: 'row',
  },
  guestOption: {
    borderWidth: 1,
    width: '20%',
    height: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
  },
  personIcon: {
    height: 20,
    width: 20,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: hp(8),
    marginVertical: 10,
    flexDirection: 'row',
  },
  timeOption: {
    borderWidth: 1,
    width: '20%',
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: 'Federo-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    height: hp(40),
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  itemImage: {
    height: hp(20),
    width: '100%',
  },
  itemTitle: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  itemDetails: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#777777',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  userTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemUser: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  updateButton: {
    borderBottomWidth: 1,
  },
  updateButtonText: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  subTimeContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginTop: 20,
    borderWidth: 1,
    height: 30,
    borderRadius: 30,
    marginLeft: 10,
  },
  subTimeText: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
  categoryContainer: {
    height: hp(12),
    marginTop: 10,
    justifyContent: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryHeaderText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Federo-Regular',
  },
  categoryList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryItem: {
    padding: 5,
    width: 100,
  },
  categoryItemImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  categoryItemText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  bannerContainer: {
    width: '100%',
    height: hp(25),
  },
  bannerItem: {
    padding: 5,
    height: hp(25),
    width: hp(45),
    marginLeft: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  bannerTextContainer: {
    width: '60%',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Federo-Regular',
  },
  bannerButton: {
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: hp(60),
    padding: 10,
  },
  modalTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp(5),
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 36,
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  modalSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: hp(8),
    marginVertical: 10,
    flexDirection: 'row',
  },
  applyButton: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
  },
  applyButtonText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
});

const Banner = [
  {
    img: require('../../assets/Cropping/img2.png'),
  },
  {
    img: require('../../assets/Cropping/img2.png'),
  },
  {
    img: require('../../assets/Cropping/img2.png'),
  },
];

const Post = [
  {
    title: 'Marrakech: Agafay Desert Tour with Quad',
    details: '192 Rue Tachenbacht, Marrakech 40000',
    img: require('../../assets/Cropping/img1.png'),
    user: 'Today 2',
    subTime: Array(5).fill({time: '08:10PM'}),
  },
  {
    title: 'Marrakech: Agafay Desert Tour with Quad',
    details: '192 Rue Tachenbacht, Marrakech 40000',
    img: require('../../assets/Cropping/img1.png'),
    user: 'Today 2',
    subTime: Array(5).fill({time: '08:10PM'}),
  },
];
