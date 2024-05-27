import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Camera from '../../assets/svg/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { errorToast } from '../../configs/customToast';
import { useDispatch, useSelector } from 'react-redux';
import { add_property_menu } from '../../redux/feature/featuresSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../../configs/Loader';
import ProfileHeader from '../../configs/ProfileHeader';

export default function AddMenu() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [ApiImages, setApiImages] = useState([]);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const handleSave = () => {
    let data = new FormData();
    data.append('property_id', item?.id);
    ApiImages.forEach((image, index) => {
      data.append(`image[${index}]`, image);
    });
    const params = {
      data: data,
      navigation: navigation,
    };
    dispatch(add_property_menu(params));
  };

  const openImageLibrary = () => {
    if (selectedImages.length >= 10) {
      errorToast('Maximum Limit Reached');
      return;
    }
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      maxFiles: 10 - selectedImages.length,
    })
      .then(images => {
        if (images.length + selectedImages.length > 10) {
          errorToast('You can select up to 10 images.');
          return;
        }
        const newSelectedImages = images.map((image, index) => ({
          id: selectedImages.length + index + 1,
          image: { uri: image.path },
        }));
        const newApiImages = images.map((image, index) => ({
          uri: image.path,
          type: image.mime,
          name: `image${user?.id}${selectedImages.length + index + 1}.png`,
        }));
        setSelectedImages([...selectedImages, ...newSelectedImages]);
        setApiImages([...ApiImages, ...newApiImages]);
      })
      .catch(err => {
        console.log(err);
        errorToast('Please reselect image');
      });
  };

  const removeImage = id => {
    const updatedSelectedImages = selectedImages.filter(
      image => image.id !== id,
    );
    setSelectedImages(updatedSelectedImages);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openImageLibrary()}>
      {item.image != null ? (
        <View style={{ width: wp(90), marginVertical: 20, height: hp(80) }}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={[
              styles.image,
              selectedImages.includes(item.id) && styles.selectedImage,
              { width: wp(90), height: hp(80) },
            ]}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeImage(item.id)}
          >
            <Image
              style={{ height: 10, width: 10 }}
              source={require('../../assets/Cropping/x-button.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.image, styles.cameraContainer]}>
          <Camera />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader title='Add Menu' />
        <View style={styles.title}>
          <Text style={styles.titleText}>{item?.title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Photos</Text>
        </View>
        <View>
          <FlatList
            data={
              selectedImages.length < 10
                ? [
                  ...selectedImages,
                  { id: selectedImages.length + 1, image: null },
                ]
                : selectedImages
            }
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Add Menu</Text>
      </TouchableOpacity>
      <View style={{ height: hp(2) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 60,
    marginTop: 25,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#000',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFF',
    lineHeight: 25.5,
    marginLeft: 10,
    fontFamily: 'Federo-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontSize: 20,
  },
  subtitle: {
    marginTop: 20,
  },
  subtitleText: {
    fontFamily: 'Federo-Regular',
    color: '#000',
    fontSize: 18,
  },
  image: {
    borderRadius: 10,
    resizeMode: 'contain',
    margin: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  cameraContainer: {
    marginTop: 10,
    borderWidth: 1,
    width: '95%',
    height: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderStyle: 'dashed',
  },
});
