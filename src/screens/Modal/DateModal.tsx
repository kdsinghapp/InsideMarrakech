import React, {useRef, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Close from '../../assets/svg/Close.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';

const DateModal = ({visible, onClose, data}) => {
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity 
      
      onPress={()=>{
        onClose()
        closeModal()
      }}
      activeOpacity={1} style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <ScrollView>
            <View style={{marginTop: 20, marginHorizontal: 15}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontWeight: '700',
                }}>
                Date
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: hp(8),

                  marginVertical: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: '#000',
                    width: '30%',
                    height: 40,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 8, fontWeight: '600', color: '#FFF'}}>
                    Wednesday 20 March
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    width: '30%',
                    height: 40,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 8, fontWeight: '600', color: '#000'}}>
                    Wednesday 20 March
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    width: '30%',
                    height: 40,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 8, fontWeight: '600', color: '#000'}}>
                    Wednesday 20 March
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontWeight: '700',
                }}>
                Guests
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: hp(8),
                 
                  marginVertical:10,
                  flexDirection:'row',
                  
                }}>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
              <View style={{borderWidth:1,width:'20%',height:40,
              flexDirection:'row',
              borderRadius:30,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'600',color:'#000',marginRight:10}}>1</Text>

                <Image   source={require('../../assets/Cropping/Person2x.png')} style={{height:20,width:20}} />



              </View>
           

               
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#FFF',
              borderWidth: 1,
              height: 55,
              width: '100%',
              marginTop: 20,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#000',
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const Account = [
  {
    name: 'Account 1',
  },
  {
    name: 'Account 2',
  },
  {
    name: 'Account 3',
  },
];

const Event = [
  {
    name: 'Match',
  },
  {
    name: 'Account',
  },
  {
    name: 'Meeting',
  },
  {
    name: 'Camp',
  },
  {
    name: 'Cup',
  },
  {
    name: 'Other',
  },
];
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: hp(50),
    elevation: 5, // Add this for Android shadow
  },
});

export default DateModal;
