import { View, Text, Dimensions, FlatList, StyleSheet ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import ScreenNameEnum from '../../routes/screenName.enum'
import GoldRight from '../../assets/svg/GoldRight.svg';
export default function Gallery_Screen() {

    const route = useRoute()
    const { item } = route.params
    const navigation = useNavigation();

    const handleImagePress = (imageUri) => {
      navigation.navigate(ScreenNameEnum.FullscreenImageScreen, { images:item });
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleImagePress(item.image)}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',alignItems:'center',height:60,}}>
         <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.goBackButton}>
        <GoldRight />
      </TouchableOpacity>
        <Text style={styles.header}>Gallery</Text>
        </View>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    goBackButton: {
        
        marginLeft: 15,
      },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft:30,

    },
    flatListContent: {
      justifyContent: 'space-between',
    },
    itemContainer: {
        width: Dimensions.get('window').width / 2 - 35,
        height: Dimensions.get('window').width / 2 - 35,
        marginBottom: 10,
        margin:10
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
  });
  
  export default Gallery_Screen;