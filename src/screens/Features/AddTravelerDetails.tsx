import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import {styles} from '../../configs/Styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import Pin from '../../assets/svg/BlackPin.svg';
import Box from '../../assets/svg/checkBox.svg';
export default function AddTravelerDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [DriverDetails, setDriverDetails] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#FFF'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader titile="Booking Details" width={18} />

        <View
          style={[
            styles.shadow,
            {
              flexDirection: 'row',
              alignItems: 'center',
              height: hp(12),
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginHorizontal: 5,
              paddingHorizontal: 5,
            },
          ]}>
          <View style={{marginLeft: 10}}>
            <Image
              source={require('../../assets/Cropping/img6.png')}
              style={{height: 80, width: 80}}
              resizeMode="contain"
            />
          </View>
          <View style={{marginLeft: 10, width: '72%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                Marralech Quad Booking
              </Text>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                $165.3
              </Text>
            </View>
            <Text style={{marginTop: 10, color: '#777777', fontSize: 12}}>
              192 Rue Tachebatch,Marrkech 40000
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
                justifyContent: 'space-around',
              }}>
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <DarkStar height={20} width={20} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                  marginLeft: 5,
                }}>
                5.0
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
            Total
          </Text>
          <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
            $84.97
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={{
            height: 45,
            backgroundColor: '#777777',
            marginTop: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#FFF', fontWeight: '600'}}>
            Select Driver
          </Text>
        </TouchableOpacity>

        {DriverDetails !== null && (
          <>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#000',
                marginHorizontal: 10,
                marginTop: 20,
              }}>
              Driver
            </Text>
            <View
              style={[
                styles.shadow,
                {
                  flexDirection: 'row',
                  marginVertical: 5,
                  backgroundColor: '#FFF',
                  alignItems: 'center',
                  height: hp(10),
                  borderRadius: 15,
                  marginHorizontal: 10,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginTop: 10,
                },
              ]}>
              <Image
                source={DriverDetails.img}
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />
              <View style={{marginLeft: 10, width: '85%'}}>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                  {DriverDetails.name}
                </Text>
                <Text
                  style={{fontSize: 12, fontWeight: '500', color: '#777777'}}>
                  {DriverDetails.Details}
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
            Traveler 1 (Adults)
          </Text>
        </View>

        <View
          style={[
            Styles.txtInput,
            {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
          ]}>
          <TextInputField
            placeholder="First Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>
        <View
          style={[
            Styles.txtInput,
            {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
          ]}>
          <TextInputField
            placeholder="Last Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
            Traveler 2 (Adults)
          </Text>
        </View>
        <View
          style={[
            Styles.txtInput,
            {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
          ]}>
          <TextInputField
            placeholder="First Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>
        <View
          style={[
            Styles.txtInput,
            {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
          ]}>
          <TextInputField
            placeholder="Last Name"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>
        <View
          style={[
            Styles.txtInput,
            {backgroundColor: '#FFFFFF', marginTop: 20, paddingRight: 10},
          ]}>
          <TextInputField
            placeholder="Language"
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>
        <View
          style={[
            Styles.txtInput,
            {
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              paddingRight: 10,
            },
          ]}>
          <Pin />
          <TextInputField
            placeholder="JIBOU RES SAADIENNE IMM P NR 15 ..."
            firstLogo={false}
            img={require('../../assets/Cropping/Lock3x.png')}
            showEye={false}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.PAYMENT_DETAILS);
          }}
          style={[
            styles.tabBtn,
            {
              backgroundColor: '#000',
            },
          ]}>
          <Text
            style={{
              fontSize: 17,
              color: '#FFFFFF',
              fontWeight: '600',
              lineHeight: 25,
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
        <Modal visible={isVisible} animationType="slide" transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',

                borderRadius: 20,
                width: '90%',
                height: hp(60),
                padding: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: hp(5),
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 20,
                    lineHeight: 36,
                    color: '#000',
                  }}>
                  Driver
                </Text>
              </View>
              <View>
                <FlatList
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelection(true);
                        setSelectedIndex(index);
                        setIsVisible(false);
                        setDriverDetails(item);
                      }}
                      style={[
                        styles.shadow,
                        {
                          flexDirection: 'row',
                          marginVertical: 5,
                          backgroundColor: '#FFF',
                          alignItems: 'center',
                          height: hp(10),
                          borderRadius: 15,
                          marginHorizontal: 10,
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                        },
                      ]}>
                      <Image
                        source={item.img}
                        style={{height: 45, width: 45, borderRadius: 22.5}}
                      />
                      <View style={{marginLeft: 10, width: '75%'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#777777',
                          }}>
                          {item.Details}
                        </Text>
                      </View>
                      {isSelected && index != selectedIndex && (
                        <View
                          style={{
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 20,
                            width: 20,
                            borderWidth: 2,
                          }}></View>
                      )}
                      {isSelected && index == selectedIndex && (
                        <Box height={20} width={20} />
                      )}
                    </TouchableOpacity>
                  )}
                  data={Driver}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <View  style={{height:hp(5)}} />
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  txtInput: {
    height: 50,

    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
  },
});

const Driver = [
  {
    name: 'Nolan Rhiel Madsen',
    Details: 'Johan Smihs',
    img: require('../../assets/Cropping/dp1.png'),
  },
  {
    name: 'Anika Septimus',
    Details: 'Johan Smihs',
    img: require('../../assets/Cropping/dp2.png'),
  },
];
