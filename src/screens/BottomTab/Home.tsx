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
  TextInput,
  Platform,
  PermissionsAndroid,
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
import SearchIcon from '../../assets/svg/search.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_all_property,
  get_banner,
  get_category,
  get_company_all_property,
  get_privacy_policy,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import axios, {all} from 'axios';
import localizationStrings from '../../utils/Localization';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();

  const category = useSelector(state => state.feature.CategoryList);
  const all_property = useSelector(state => state.feature.allProperty);
  const CompanyProperty = useSelector(state => state.feature.CompanyProperty);
  const BannerList = useSelector(state => state.feature.BannerList);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [origin, setOrigin] = useState({ latitude: 22.701384, longitude: 75.867401 });
  const [locationName, setLocationName] = useState('');





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



  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const filteredPropertiesByCategory = selectedCategory
    ? all_property?.filter(item => item.cat_id === selectedCategory)
    : [];

  const filteredPropertiesBySearch = searchQuery
    ? all_property?.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];


  useEffect(() => {
    dispatch(get_category());
    dispatch(get_banner());
    dispatch(get_all_property());
    get_Companyproperty();
  }, [isFocused, user]);

  const renderList = ({item}) => {
    // Check if document_gallery array exists and is not empty
    const formatTimes = () => {
      const [startTimeStr, endTimeStr] = item?.opening_hours?.split('/');
      const formattedStartTime = timeFormate(startTimeStr);
      const formattedEndTime = timeFormate(endTimeStr);
      return {
        startTime: formattedStartTime,
        endTime: formattedEndTime
      };
    };
    if (item.document_gallery && item.document_gallery.length > 0) {
      // Check if the first object in document_gallery has the image property
      const firstImage = item.document_gallery[0].image;
      if (firstImage) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, {item: item});
            }}
            style={[styles.shadow, styles.itemContainer]}>
            <Image
              source={{uri: firstImage}}
              style={styles.itemImage}
              resizeMode="cover"
            />

            <Text style={styles.itemTitle}>{item.name}</Text>
            <View style={styles.detailsContainer}>
        
        <Text style={styles.itemDetails}>{item.title}</Text>
      </View>
            <View style={styles.detailsContainer}>
              <Pin />
              <Text style={styles.itemDetails}>{item.address}</Text>
            </View>
           
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>{localizationStrings.price} : {item.amount}</Text>
                
              </View>
             

             
            </View>
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>{localizationStrings.Open_Time} : {formatTimes().startTime}</Text>
                
              </View>
             
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}> {localizationStrings.Close_Time} : {formatTimes().endTime}</Text>
                
              </View>
             

             
            </View>
          </TouchableOpacity>
        );
      }
    }
    // If document_gallery is empty or image property is undefined, return null or a placeholder
    return null;
  };
  // const renderCompanyList = ({item}) => {
  //   // Check if document_gallery and its first element exist
  //   const firstImage = item.document_gallery && item.document_gallery.length > 0 ? item.document_gallery[item.document_gallery.length -1].image : null;
  
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.navigate(ScreenNameEnum.PLACE_DETAILS, {item: item});
  //       }}
  //       style={[styles.shadow, styles.itemContainer]}>
  //       {/* Check if item.image is not empty or undefined */}
  //       {item.image == '' || item.image == undefined ? (
  //         <Image
  //           source={{uri: firstImage}}
  //           style={styles.itemImage}
  //           resizeMode="cover"
  //         />
  //       ) : (
  //         <Image
  //           source={require('../../assets/Cropping/empty.jpg')}
  //           style={styles.itemImage}
  //           resizeMode="cover"
  //         />
  //       )}
  //       <TouchableOpacity 
  //         onPress={()=>{
  //           navigation.navigate(ScreenNameEnum.updateProperty,{item:item})
  //         }}
  //         style={{position: 'absolute', right: 20, top: 20}}>
  //         <Image
  //           source={require('../../assets/Cropping/Icon.png')}
  //           style={{height: 40, width: 40}}
  //         />
  //       </TouchableOpacity>
  
  //       <Text style={styles.itemTitle}>{item.name}</Text>
  //       <View style={styles.detailsContainer}>
       
  //         <Text style={styles.itemDetails}>{item.title}</Text>
  //       </View>
  //       <View style={styles.detailsContainer}>
       
  //         <Text style={styles.itemDetails}>{item.description}</Text>
  //       </View>
  //       <View style={styles.detailsContainer}>
  //         <Pin />
  //         <Text style={styles.itemDetails}> {item.address}</Text>
  //       </View>
  
  //       <View style={styles.userContainer}>
  //         <View style={styles.userTextContainer}>
  //           <Text style={[styles.itemUser, {color: '#f0f0f0'}]}></Text>
  //         </View>
  
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate(ScreenNameEnum.AddMenu, {item: item});
  //           }}
  //           style={{
  //             backgroundColor: '#C59745',
  //             paddingHorizontal: 10,
  //             paddingVertical: 10,
  //             borderRadius: 10,
  //           }}>
  //           <Text style={[styles.updateButtonText, {color: '#fff'}]}>
  //             Add Menu
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  
  const get_Companyproperty = () => {
    const params = {
      company_id: user?.id,
    };
    dispatch(get_company_all_property(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        {user?.type === 'User' && (
          <>
           <View style={styles.searchContainer}>
          <View style={styles.search}>
            <SearchIcon />
            <TextInput
              placeholder={localizationStrings.search}
              placeholderTextColor={'#000'}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        {searchQuery === '' && (      <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryHeaderText}>{localizationStrings.category}</Text>
                <BlackDown />
              </View>
              
             
              <View style={styles.categoryList}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={category}
                  horizontal
                  renderItem={({item, index}) => (
                    <TouchableOpacity 
                    
                    onPress={() => handleCategorySelect(item.id)}
                    style={styles.categoryItem}>
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
        )}
            {searchQuery === '' && (
              <View style={styles.bannerContainer}>
                {BannerList && (
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={BannerList}
                    horizontal
                    renderItem={({item, index}) => (
                      <View style={styles.bannerItem}>
                        <ImageBackground
                          source={{uri: item.image}}
                          style={styles.bannerImage}
                          resizeMode="contain">
                          <TouchableOpacity 
                            onPress={()=>{
                              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, {item:{id:item.property_id}});
                            }}
                            style={styles.bannerButton}>
                            <Text style={styles.bannerButtonText}>{localizationStrings.View}</Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    )}
                  />
                )}
              </View>
            )}

            <FlatList
                showsVerticalScrollIndicator={false}
                data={selectedCategory ? filteredPropertiesByCategory : searchQuery ? filteredPropertiesBySearch : all_property}

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
          <View style={{flex: 1}}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{localizationStrings.my_activity}</Text>
            </View>
         
            {/* {CompanyProperty?.length > 0 ?<FlatList
              showsVerticalScrollIndicator={false}
              data={filteredCompanyProperties}
              renderItem={renderCompanyList}
            />:<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:14,color:'#000', fontFamily: 'Federo-Regular',}}>{localizationStrings.No_P_found}</Text>
              </View>} */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 10,
    height: hp(8),
    justifyContent: 'center',
  },
  search: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal:10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
  },
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
   paddingVertical:10,
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  itemImage: {
    height: hp(20),
    width: '100%',
    borderRadius: 10,
    marginBottom: 30,
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
  
    paddingHorizontal: 10,
  },
  userTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10
  },
  itemUser: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
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
    borderRadius:15,
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
