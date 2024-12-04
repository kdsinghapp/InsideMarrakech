import React, { useEffect, useRef, useState } from 'react';
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
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import Header from '../../configs/Header';
import Searchbar from '../../configs/Searchbar';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BlackDown from '../../assets/svg/BlackDown.svg';
import Pin from '../../assets/svg/Pin.svg';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import SearchIcon from '../../assets/svg/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import {
  add_customise_service,
  get_all_property,
  get_banner,
  get_category,
  get_company_all_property,
  get_privacy_policy,
} from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import axios, { all } from 'axios';
import localizationStrings from '../../utils/Localization';
import ModalForm from '../Modal/ModalForm';
import { KeyboardAvoidingView } from 'react-native';
const { width } = Dimensions.get('window');
export default function Home() {

  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const [loadingState, setLoadingState] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const category = useSelector(state => state.feature.CategoryList);
  const all_property = useSelector(state => state.feature.allProperty);
  const CompanyProperty = useSelector(state => state.feature.CompanyProperty);
  const BannerList = useSelector(state => state.feature.BannerList);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (formData) => {
    console.log('Form Data:', formData);
    // Handle form submission
  };

  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const onViewRef = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
          setActiveIndex(viewableItems[0].index);
      }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });





  


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


  useFocusEffect(
    React.useCallback(() => {
    
     
      dispatch(get_category());
      dispatch(get_banner());
      dispatch(get_all_property())
      get_Companyproperty();
    }, [])
  );


  const renderList = ({ item, index }) => {

    if (item.main_image != '') {
      // Check if the first object in document_gallery has the image property
      const firstImage = item.main_image;
      if (firstImage) {
        return (
          <TouchableOpacity
   
            onPress={() => {
              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, { item: item });
            }}
            style={[styles.shadow, styles.itemContainer]}>
            {/* <Image
              source={{ uri: firstImage }}
              style={styles.itemImage}
              resizeMode="cover"
            /> */}
            <FlatList
                        data={[{image:item.main_image},...item?.document_gallery]}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <Pressable style={{}}>
                            <FastImage
                                source={{ uri: item.image }}
                                style={{
                                    width: wp(85), // Full width of the screen for each image
                                    height: hp(25),
                                    borderRadius:15,
                                    marginLeft:10
                         
                                }}
                                resizeMode='cover'
                            />
                            </Pressable>
                        )}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                    />
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        {[{image:item?.main_image},...item?.document_gallery]?.map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: 4,
                                    backgroundColor: index === activeIndex ? 'green' : 'gray',
                                    margin: 5,
                                }}
                            />
                        ))}
                    </View>
            {loadingState[index] && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="small"
                color="#000"
              />
            )}


            <Text style={styles.itemTitle}>{item.name}</Text>
            <View style={styles.detailsContainer}>

              {/* <Text style={styles.itemDetails}>{item.title}</Text> */}
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
            {/* <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>{localizationStrings.Open_Time} : {item.lunch_start}</Text>

              </View>

              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}> {localizationStrings.Close_Time} : {item.lunch_end}</Text>

              </View>



            </View> */}
          </TouchableOpacity>
     
        );
      }
    }

    return null;
  };



  const get_Companyproperty = () => {
    const params = {
      company_id: user?.id,
    };
    dispatch(get_company_all_property(params));
  };

  const handleImageLoadStart = (index) => {
    setLoadingState((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handleImageLoadEnd = (index) => {
    setLoadingState((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };



  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height:Platform.OS !== 'android'?40:10,}} />
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
            {searchQuery === '' && (
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryHeaderText}>{localizationStrings.category}</Text>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate(ScreenNameEnum.SeeallCategory)
                }}>

                <BlackDown />
                </TouchableOpacity>
              </View>


              <View style={styles.categoryList}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={category}
                  horizontal
                  renderItem={({ item, index }) => (

<TouchableOpacity

onPress={()=>{
    if(item.name === 'Prestations sur mesure'){
      setModalVisible(true)
    }else{
      navigation.navigate(ScreenNameEnum.seeSubcategory,
      {
        id: item.id
      })
    }
  }
}
style={[
  styles.shadow,
  {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    width: 90,
    borderRadius: 10,
    marginVertical:10


    

  },
]}>

{loadingState[
    index
  ]&&(<ActivityIndicator style={
    {
      position: 'absolute',
      top: 20
    }
  } size="small" color="#000"/>)
}
<FastImage
  style={{
    height: 70,
    width: 90,
    borderRadius: 10,

  }}
  source={{
    uri: item.image,

    priority: FastImage.priority.high,
  }}
  resizeMode={FastImage.resizeMode.cover}
/>


<Text
  style={{
    fontSize: 10,
    fontWeight: '600',

    lineHeight: 12,
    color: '#352C48',
    marginTop: 5,
    textAlign: 'center'
  }}>
  {item.name}
</Text>
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
                    onLoadStart={() => handleImageLoadStart(index)}
                    onLoadEnd={() => handleImageLoadEnd(index)}
                    horizontal
                    renderItem={({ item, index }) => (
                      <View style={styles.bannerItem}>

                        <ImageBackground
                          source={{ uri: item.image }}
                          style={styles.bannerImage}
                          resizeMode="cover">
                          {loadingState[index] && (
                            <ActivityIndicator
                              style={styles.loadingIndicator}
                              size="small"
                              color="#000"
                            />
                          )}
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, { item: { id: item.property_id } });
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
              onLoadStart={() => handleImageLoadStart(index)}
              onLoadEnd={() => handleImageLoadEnd(index)}
              data={
                selectedCategory
                  ? filteredPropertiesByCategory
                  : searchQuery
                    ? filteredPropertiesBySearch
                    : all_property
              }
              renderItem={renderList}
              keyExtractor={(item) => item.id}
            />

          </>
        )}
        {user?.type === 'Company' && (
          <View style={{ flex: 1 }}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{localizationStrings.my_activity}</Text>
            </View>

            {CompanyProperty?.length > 0 ? <FlatList
              showsVerticalScrollIndicator={false}
              data={CompanyProperty}
              renderItem={renderList}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Federo-Regular', }}>{localizationStrings.No_P_found}</Text>
            </View>}
          </View>
        )}
      </ScrollView>

      <ModalForm
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </KeyboardAvoidingView>
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
    marginHorizontal: 10,
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
    width: '90%',
    lineHeight: 18,
    fontFamily: 'Federo-Regular',

  },
  shadow:{shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,
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
    paddingHorizontal: 10,
   
  },

  itemContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
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
    fontSize: 12,
    fontWeight: '400',
    color: '#777777',
    marginLeft:5
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
paddingBottom:10,
    paddingHorizontal:5,
  },
  userTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  itemUser: {
    fontFamily: 'Federo-Regular',
    fontSize: 16,
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
    height: hp(25),

    marginTop:20,
    paddingHorizontal: 10,
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
    minHeight:hp(15),
    marginVertical:20,


  },
  categoryItem: {
    padding: 5,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  categoryItemImage: {
    height: 30,
    width: 30,

  },
  categoryItemText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  bannerContainer: {
  
    height: hp(23),


  },
  bannerItem: {
    padding: 5,
    height: hp(22),
    width: hp(43),




  },
  bannerImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,


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
    paddingHorizontal: 10,
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
    subTime: Array(5).fill({ time: '08:10PM' }),
  },
  {
    title: 'Marrakech: Agafay Desert Tour with Quad',
    details: '192 Rue Tachenbacht, Marrakech 40000',
    img: require('../../assets/Cropping/img1.png'),
    user: 'Today 2',
    subTime: Array(5).fill({ time: '08:10PM' }),
  },
];
