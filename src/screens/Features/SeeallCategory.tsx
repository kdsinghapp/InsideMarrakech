import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import ProfileHeader from '../../configs/ProfileHeader';
import localizationStrings from '../../utils/Localization';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { get_category } from '../../redux/feature/featuresSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../configs/Loader';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const SeeallCategory = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const isLoading = useSelector(state => state.feature.isLoading)
    const categories = useSelector(state => state.feature.CategoryList);
    useEffect(() => {
        dispatch(get_category());
        
      }, [isFocused, user]);
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.seeSubcategory,{id:item.id})
        }}
        style={[
            styles.shadow,
            {

              borderRadius: 10,
              marginVertical: 10,
              alignSelf: 'center',
              backgroundColor: '#FFFFFF',
              marginHorizontal: 10,
              width: wp(40),
              justifyContent: 'center',
              alignItems: 'center'
            },
          ]}>
      
    
          <View style={{
            marginTop: 5, paddingBottom: 10,
    
          }}>
            <Image
              resizeMode='cover'
              source={{ uri: item.image }}
              style={{
                height: hp(15),
                width: wp(35),
                borderRadius: 15,
                borderColor: '#7756FC',
              }}
            />
          </View>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
           {isLoading?<Loading />:null}
             <ProfileHeader title={localizationStrings.category}/>
             <View style={[styles.container,{alignItems:'center'}]}>
            <FlatList
            showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
     
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding:5,
    width:'45%',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      height:hp(25),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '80%',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        fontFamily: 'Federo-Regular',
    },
});

export default SeeallCategory;
