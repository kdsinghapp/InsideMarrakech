import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from '../../configs/ProfileHeader';
import {styles} from '../../configs/Styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DarkStar from '../../assets/svg/DarkStar.svg';
import TextInputField from '../../configs/TextInput';
import ScreenNameEnum from '../../routes/screenName.enum';
import {useNavigation} from '@react-navigation/native';
import AddPlus from '../../assets/svg/Add.svg';
import Box from '../../assets/svg/checkBox.svg';
import {RadioButton} from 'react-native-radio-buttons-group';
export default function PaymentDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [DriverDetails, setDriverDetails] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const handleItemSelect = index => {
    setSelectedItemIndex(index);
  };
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
            MAD 84.97
          </Text>
        </View>

        <View
          style={{
            height: hp(6),
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
            Payment Details
          </Text>
        </View>
        <View
          style={{
            height: hp(6),
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
            Credi & Debit Cards
          </Text>
        </View>
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
              marginHorizontal:10
            },
          ]}>
          <FlatList
            scrollEnabled={false}
            data={card}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleItemSelect(index)}
                style={{
                  height: 36,
                  borderRadius: 8,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#F5F5F5',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                
                }}>
                <View>
                  <Image
                    source={item.logo}
                    style={{height: 20, width: 32}}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '70%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15.18,
                      color: '#606060',
                      fontWeight: '400',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 15.18,
                      color: '#606060',
                      fontWeight: '400',
                    }}>
                    {item.cardNo}
                  </Text>
                </View>
                {selectedItemIndex === index && (
                  <RadioButton
                    selected={true}
                    onPress={() => {}}
                    color="#6D6EEC"
                    borderSize={1}
                    size={20}
                    borderColor="#6D6EEC"
                  />
                )}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
            <View
              style={{
              
                height: 35,
                width: 35,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AddPlus />
            </View>
            <View
              style={{width: '80%', justifyContent: 'center', marginLeft: 10}}>
              <Text
                style={{
                  color: '#606060',
                  fontSize: 14,
                  lineHeight: 21,
                  fontWeight: '400',
                }}>
                Add New Card
              </Text>
            </View>
            
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 15, marginVertical: 10}}>
          <View>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 21,
                marginTop: 5,
                fontWeight: '500',
                color: '#000000',
              }}>
              Card Number
            </Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: '#F8F8F8',
              marginTop: 10,
              borderRadius: 12,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TextInput
      placeholder="Enter 12 digit card number"
      placeholderTextColor={'#979797'}
      style={{ fontSize: 12, fontWeight: '400', lineHeight: 20 }}
    />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            paddingVertical:10,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                width: '40%',
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 21,
                  marginTop: 5,
                  fontWeight: '500',
                  color: '#000000',
                }}>
                Valid Thru
              </Text>
            </View>


            <View
              style={{
                width: '40%',
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 21,
                  marginTop: 5,
                  fontWeight: '500',
                  color: '#000000',
                }}>
                CVV
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
             paddingVertical:10,
              alignItems: 'center',
              marginTop: 5,
            }}>
                <View style={{width:'60%',flexDirection:'row',justifyContent:'space-between'}}>
            <View
              style={{
                width: '48%',
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems:'center',
                backgroundColor:'#F8F8F8',
                borderRadius:12
              }}>
            <TextInput  placeholder='Month'  s/>
            </View>
            <View
              style={{
                width: '48%',
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems:'center',
                backgroundColor:'#F8F8F8',
                borderRadius:12
              }}>
            <TextInput  placeholder='Year'  s/>
            </View>
            </View>
            <View style={{flexDirectionr:'row', width: '30%', backgroundColor:'#F8F8F8',borderRadius:12}}>


            <View
              style={{
             
                paddingHorizontal:15,
                justifyContent:'space-between',
                alignItems:'center',
                flexDirection:'row',
            
               
                
              }}>
                <View style={{width:'60%',}}>

            <TextInput  placeholder='CVV'/>
                </View>
            <TouchableOpacity>


            <Image source={require('../../assets/Cropping/eyes4.png')}  style={{height:20,width:20}}/>
            </TouchableOpacity>
            </View>
            </View>


          
          </View>
             
          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 21,
                marginTop: 5,
                fontWeight: '500',
                color: '#000000',
              }}>
              Card Holder’s Name
            </Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: '#F8F8F8',
              marginTop: 10,
              borderRadius: 12,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TextInput
              placeholder="Name on Card"
              placeholderTextColor={'#979797'}
              style={{fontSize: 12, fontWeight: '400', lineHeight: 20}}
            />
          </View>
        </View>
        

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.PAYMENT_SUCCESS);
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

        <View style={{height: hp(5)}} />
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
const card = [
  {
    cardNo: '**** **** **** 8395',
    name: 'Axis Bank',
    logo: require('../../assets/Cropping/master.png'),
  },
  {
    cardNo: '**** **** **** 6246',
    name: 'HDFC Bank',
    logo: require('../../assets/Cropping/visa.png'),
  },
];
