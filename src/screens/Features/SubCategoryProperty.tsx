
    import React, { useEffect, useRef, useState } from 'react';
    import {
      View,
      Pressable,
      Text,
      Image,
      TouchableOpacity,
      StyleSheet,
      TextInput,
      FlatList,
      ScrollView,
    } from 'react-native';
    import {
      widthPercentageToDP as wp,
      heightPercentageToDP as hp,
    } from 'react-native-responsive-screen';
    import SearchIcon from '../../assets/svg/search.svg';
    import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
    import ScreenNameEnum from '../../routes/screenName.enum';
    import ProfileHeader from '../../configs/ProfileHeader';
    import Pin from '../../assets/svg/Pin.svg';
    import { useDispatch, useSelector } from 'react-redux';
    import { get_all_property, get_all_property_sub_category } from '../../redux/feature/featuresSlice';
    import localizationStrings from '../../utils/Localization';
import Loading from '../../configs/Loader';
    
    export default function SubCategoryProperty() {
        const route = useRoute()
        const { id} = route.params
      const navigation = useNavigation();
      const user = useSelector(state => state.auth.userData);
      const getsubcategoryProperty = useSelector(state => state.feature.getsubcategoryProperty);
      const isFocused = useIsFocused();
      const dispatch = useDispatch();
      const [loadingState, setLoadingState] = useState({});
      const [searchQuery, setSearchQuery] = useState('');
      const [activeIndex, setActiveIndex] = useState(0); // State to track the active index
      const isLoading = useSelector(state => state.feature.isLoading);
      const onViewRef = useRef(({ viewableItems }) => {
          if (viewableItems.length > 0) {
              setActiveIndex(viewableItems[0].index);
          }
      });
    
      const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    
    
    
      useEffect(() => {

        const params ={
            sub_category_id:id
        }
        dispatch(get_all_property_sub_category(params));
      }, [isFocused, user]);
    
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
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: wp(80), // Full width of the screen for each image
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
    

    
      const filteredProperties = getsubcategoryProperty?.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      return (
        <View style={styles.container}>
            <ProfileHeader title={''} width={30} />
           {isLoading?<Loading  />:
           
          <ScrollView showsVerticalScrollIndicator={false}>
           
          

            
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
    
            {filteredProperties?.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredProperties}
                renderItem={renderList}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{localizationStrings.no_data_found}</Text>
              </View>
            )}
          </ScrollView>
          }
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        marginHorizontal:20
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
        marginHorizontal: 20,
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
        width:'90%',
      },
      noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      },
      noDataText: {
        fontSize: 18,
        color: '#777',
      },
    });
    