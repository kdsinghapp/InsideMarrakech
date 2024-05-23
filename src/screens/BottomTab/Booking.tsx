import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BlackPin from '../../assets/svg/BlackPin.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../configs/Styles';
import ProfileHeader from '../../configs/ProfileHeader';

export default function Booking() {
  const [chooseBtn, setChooseBtn] = useState(true);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={[styles.shadow, localStyles.itemContainer]}>
      <View style={localStyles.itemRow}>
        <View style={localStyles.itemImageContainer}>
          <Image
            source={item.img}
            style={localStyles.itemImage}
            resizeMode="contain"
          />
        </View>
        <View style={localStyles.itemDetailsContainer}>
          <View style={localStyles.itemNameRow}>
            <Text style={localStyles.itemName}>{item.name}</Text>
          </View>
          <View style={localStyles.itemDetailsRow}>
            <BlackPin />
            <Text style={localStyles.itemDetails}>{item.Details}</Text>
          </View>
          <View style={localStyles.itemFooter}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.TRACK_ORDER);
              }}
              style={[
                localStyles.statusButton,
                { backgroundColor: item.status === 'Canceled' ? 'red' : '#000' },
                styles.shadow,
              ]}
            >
              <Text style={localStyles.statusButtonText}>{item.status}</Text>
            </TouchableOpacity>
            <View>
              <Text style={localStyles.itemTime}>{item.Time}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={localStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Booking" width={25} />
        <View style={localStyles.toggleButtonsContainer}>
          <TouchableOpacity
            disabled={chooseBtn}
            onPress={() => {
              setChooseBtn(true);
            }}
            style={[
              localStyles.toggleButton,
              { borderBottomWidth: chooseBtn ? 2 : 0 },
            ]}
          >
            <Text style={localStyles.toggleButtonText}>Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!chooseBtn}
            onPress={() => {
              setChooseBtn(false);
            }}
            style={[
              localStyles.toggleButton,
              { borderBottomWidth: chooseBtn ? 0 : 2 },
            ]}
          >
            <Text style={localStyles.toggleButtonText}>Canceled</Text>
          </TouchableOpacity>
        </View>
        <View style={localStyles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chooseBtn ? CompleteBooking : CancelBooking}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const CompleteBooking = [
  {
    id: '1',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Completed',
    Time: 'March 26, 2024',
  },
  {
    id: '2',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Completed',
    Time: 'March 26, 2024',
  },
  {
    id: '4',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Completed',
    Time: 'March 26, 2024',
  },
];

const CancelBooking = [
  {
    id: '1',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Canceled',
    Time: 'March 26, 2024',
  },
  {
    id: '2',
    name: 'Marrakech Quad',
    Details: 'JIBOU RES SAADIENNE IMM P NR 15 ...',
    img: require('../../assets/Cropping/img3.png'),
    status: 'Canceled',
    Time: 'March 26, 2024',
  },
];

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  itemContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    padding: 15,
    width: '95%',
    paddingHorizontal: 5,
  },
  itemRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  itemImageContainer: {
    height: 100,
    marginLeft: 5,
    width: 100,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderColor: '#7756FC',
  },
  itemDetailsContainer: {
    marginLeft: 15,
    width: '65%',
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#000000',
    fontFamily: 'Federo-Regular',
  },
  itemDetailsRow: {
    flexDirection: 'row',
  },
  itemDetails: {
    color: '#352C48',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Federo-Regular',
    fontWeight: '500',
  },
  itemFooter: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
  },
  statusButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: 30,
  },
  statusButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#FFF',
    fontFamily: 'Federo-Regular',
  },
  itemTime: {
    fontFamily: 'Federo-Regular',
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
  },
  toggleButtonsContainer: {
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('45%'),
    height: 47,
  },
  toggleButtonText: {
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
