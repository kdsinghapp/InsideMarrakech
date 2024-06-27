import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        style={styles.itemContainer}>
            <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="contain"
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
           {isLoading?<Loading />:null}
             <ProfileHeader title={localizationStrings.category}/>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
});

export default SeeallCategory;
