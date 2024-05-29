import {View, Text, StyleSheet, FlatList, TouchableOpacity,Image} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../configs/Loader';
import ProfileHeader from '../../configs/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {get_user_wishlist} from '../../redux/feature/featuresSlice';
import ScreenNameEnum from '../../routes/screenName.enum';
import Pin from '../../assets/svg/Pin.svg';
export default function WishList() {
  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const FavProperty = useSelector(state => state.feature.FavList);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    getwishlist();
  }, [isFocuse]);

  const getwishlist = () => {
    const params = {
      user_id: user?.id,
    };

    dispatch(get_user_wishlist(params));
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
      console.log('Invalid date string', utcDateString);
    }
  };

  const renderList = ({item}) => {
    const propertyData = item.property_data;
  
    if (propertyData && propertyData.document_gallery && propertyData.document_gallery.length > 0) {
      const firstImage = propertyData.document_gallery[0].image;
      if (firstImage) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, {item: item});
            }}
            style={[styles.shadow, styles.itemContainer]}
          >
            <Image
              source={{uri: firstImage}}
              style={styles.itemImage}
              resizeMode="cover"
            />
    
            <Text style={styles.itemTitle}>{propertyData.name}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.itemDetails}>{propertyData.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Pin />
              <Text style={styles.itemDetails}>{propertyData.address}</Text>
            </View>
    
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>Price : {propertyData.amount}</Text>
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>
                  Open Time : {timeFormate(propertyData.opening_hours.startTime)}
                </Text>
              </View>
    
              <View style={styles.userTextContainer}>
                <Text style={styles.itemUser}>
                  Close Time : {timeFormate(propertyData.opening_hours.endTime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  };
  
  

  return (

      <View style={styles.container}>
        {isLoading ? <Loading /> : null}
        <ProfileHeader title={'WishList'} width={26} />
        {FavProperty.length > 0 && (
          <>
            {FavProperty.map((favItem, index) => (
              <FlatList
                key={index}
                showsVerticalScrollIndicator={false}
                data={favItem.property_data}
                renderItem={({ item }) => renderList({ item })}
              />
            ))}
          </>
        )}
      </View>
    );
  
}

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  itemUser: {
    fontFamily: 'Federo-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

