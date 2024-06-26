import React, { useEffect, useState } from 'react';
import {
  View,
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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from '../../configs/ProfileHeader';
import Pin from '../../assets/svg/Pin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_property } from '../../redux/feature/featuresSlice';
import localizationStrings from '../../utils/Localization';

export default function Search() {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const all_property = useSelector(state => state.feature.allProperty);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(get_all_property());
  }, [isFocused, user]);

  const renderList = ({ item }) => {
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
      const firstImage = item.document_gallery[0].image;
      if (firstImage) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.PLACE_DETAILS, { item: item });
            }}
            style={[styles.shadow, styles.itemContainer]}>
            <Image
              source={{ uri: firstImage }}
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
                <Text style={styles.itemUser}>{localizationStrings.Close_Time} : {formatTimes().endTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
    return null;
  };

  const timeFormate = utcDateString => {
    const date = new Date(utcDateString);

    if (!isNaN(date.getTime())) {
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

  const filteredProperties = all_property?.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title={localizationStrings.search} width={30} />
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
