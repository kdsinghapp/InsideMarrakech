import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
  Platform,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import ProfileHeader from '../../configs/ProfileHeader';
import Right from '../../assets/svg/Right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { add_subcription_plan, get_subscription } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import localizationStrings from '../../utils/Localization';
import { RadioButton } from 'react-native-paper';
import { errorToast } from '../../configs/customToast';
import WebView from 'react-native-webview';
import { get_profile } from '../../redux/feature/authSlice';
export default function Subscription() {
  const navigation = useNavigation();
const isFocuse = useIsFocused()
const Updated_user = useSelector(state => state.auth.Update_user);
  const getSubscription = useSelector(state => state.feature.getSubscription);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
const [selectedPlan,setselectedPlan]= useState(null)
const [checkoutUrl, setCheckoutUrl] = useState(false);
  useEffect(() => {
    dispatch(get_subscription());
    get_userprofile()
  }, [isFocuse]);
  const user = useSelector(state => state.auth.userData);

const buy_subscription =()=>{
if(selectedPlan == null){
  return errorToast('Please choose the subscription')
}

setCheckoutUrl(true)
}
const payment_uri = `https://server-php-8-2.technorizen.com/inside/admin/subcription_payment?user_id=${user.id}&amount=${selectedPlan?.amount}&currency=eur&subcription_plan_id=${selectedPlan?.id}`





const get_userprofile = () => {
  const params = {
    user_id: user?.id,
  };
  dispatch(get_profile(params));
};
const handleNavigationStateChange = async (navState) => {

console.log('navState',navState);

  if (navState.url.includes('paystripedata')) {
    setCheckoutUrl(false);
    purchase_subscription();
    Alert.alert(
      "Success",
      "Subscription purchased successfully",
      [{ text: "OK" }]
    );


  } 

};

console.log(Updated_user?.subcription_id);

const handleError = (error) => {
  console.error('WebView Error:', error);
  Alert.alert('Error', 'Failed to load payment page. Please try again later.');
  setCheckoutUrl(false);

};

const purchase_subscription =()=>{
  const params ={
    user_id:user?.id,
    subcription_id:selectedPlan?.id,
amount:selectedPlan?.amount
  }

  dispatch(add_subcription_plan(params)).then(res=>{
    get_userprofile()
  })
}
const filterSubscriptionById = (id) => {
  return getSubscription.filter(getSubscription => getSubscription.id === id);
};

// Example usage
const MyPlan = filterSubscriptionById(Updated_user?.subcription_id)[0];
console.log('MyPlan',MyPlan);

  return (
    <View style={styles.container}>
      {isLoading?<Loading  />:null}
      <View  style={{marginTop:Platform.OS == 'ios'?10:0}}/>
      {checkoutUrl ? (
        <WebView
          source={{ uri: payment_uri }}
          onNavigationStateChange={handleNavigationStateChange}

          onError={handleError}
          style={{ marginTop: 40 }}
        />
      ) :
      <ImageBackground
        source={require('../../assets/Cropping/sub.png')}
        style={{ flex: 1 }}
      >
        <ProfileHeader title={localizationStrings.subscription} width={22} />

        <View style={styles.contentContainer}>
         {Updated_user?.subcription_status && <View style={{borderWidth:1,width:'80%',height:hp(20),borderRadius:10,alignItems:'center',padding:6}}>
          <Text style={[styles.title,{marginTop:5}]}>{localizationStrings.your_plan}</Text>
          <Text style={[styles.itemText,{marginVertical:8}]}>{MyPlan?.name} ( {MyPlan?.period} {MyPlan?.type} )</Text>
          <Text style={styles.itemText}>{localizationStrings.price} :  € {MyPlan?.amount}</Text>
          <Text style={[styles.itemText,{marginVertical:8}]}>{localizationStrings.Validity} : {Updated_user?.valid_subcription_plan}</Text>
          <Text style={styles.itemText}>{localizationStrings.Purchase_date} : {Updated_user?.start_subcription_plan}</Text>

          </View>}
          <Text style={styles.title}>{localizationStrings.upgrad_pre}</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={getSubscription}
              renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={()=>{
                  setselectedPlan(item)
                }}
                style={[styles.itemContainer,{backgroundColor:item.id == selectedPlan?.id ||Updated_user?.subcription_id == item.id? '#c9f5d4' : '#fff',
             marginTop:15,
         marginHorizontal:10,
                borderRadius:10,paddingHorizontal:30}]}>
                  <Text style={styles.itemText}>{item.name} ( {item.period} {item.type} ) {localizationStrings.price}: € {item.amount}</Text>
                  <RadioButton
                      value={item.id}
                      status={item.id == selectedPlan?.id || Updated_user?.subcription_id == item.id? 'checked' : 'unchecked'}

    
                    />
               
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Cropping/Logo3x.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <TouchableOpacity 
        onPress={()=>{
          buy_subscription()
        }}
        style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>{localizationStrings.up_now}</Text>
        </TouchableOpacity>
      </ImageBackground>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Federo-Regular',
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginTop: 30,
  },
  listContainer: {
    marginTop: 30,
    height: hp(30),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    
  },
  itemText: {
    fontFamily: 'Federo-Regular',
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  logoContainer: {
    height: hp(10),
  },
  logo: {
    height: 80,
    width: 80,
  },
  upgradeButton: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: 55,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButtonText: {
    fontFamily: 'Federo-Regular',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

const subscriptonData = [
  {
    id: '1',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '2',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '3',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
  {
    id: '4',
    titile: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'Last Wednesday at 9:42 AM',
    type: 'btn',
  },
];
