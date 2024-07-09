import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Camera from '../../assets/svg/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { errorToast } from '../../configs/customToast';
import TextInputField from '../../configs/TextInput';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { add_property, get_category, get_sub_category, update_property } from '../../redux/feature/featuresSlice';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../../configs/Loader';
import DatePicker from 'react-native-date-picker';
import localizationStrings from '../../utils/Localization';
import GooglePlacesInput from '../../configs/AutoAddress';

export default function updateProperty() {
  const routes = useRoute();
  const { item } = routes.params;
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [ApiImages, setApiImages] = useState([]);
  const [Title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [Category, setCategory] = useState(null);
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState(null);
  const [LocationName, setLocationName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [OpenTime, setOpenTime] = useState();
  const [CloseTime, setCloseTime] = useState();
  const [Price, setPrice] = useState('');
  const [CategoryId, setCategoryId] = useState('');
  const user = useSelector(state => state.auth.userData);
  const category = useSelector(state => state.feature.CategoryList);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [minGuest, setminGuest] = useState(0);
  const [maxGuest, setmacGuest] = useState(0);
  const navigation = useNavigation();
  const subcategory = useSelector(state => state.feature.subcategory);
  const [Photo, setPhoto] = useState(null)
  const [SubCategory, setSubCategory] = useState(null);
  const [SubCategoryId, setSubCategoryId] = useState('');



  useEffect(() => {
    dispatch(get_category());
  }, [isFocused]);
  useEffect(() => {
    setLocationName(item.address);
    setPrice(item.amount);
    setMobileNumber(item.book_online_mobile_number);
    setDescription(item.description);
    setminGuest(item?.no_of_guest_min)
    setmacGuest(item?.no_of_guest_max)
    setCategoryId(item.cat_id);
    setSubCategoryId(item?.sub_category_id)

    setPhoto({
      path: item?.main_image,
      type: "image/jpeg",
      name: `image${user?.id}${new Date()}.png`,
    })
    setLocation({
      latitude: item?.lat,
      longitude: item?.lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })

    setSelectedImages(
      item.document_gallery?.map((image, index) => ({
        id: index + 1,
        name: `image${user?.id}${selectedImages.length + index + 1}.png`,
        image: { uri: image.image }
      })) || []
    );
    setApiImages(
      item.document_gallery?.map((image, index) => ({
        type: "image/jpeg",
        name: `image${user?.id}${selectedImages.length + index + 1}.png`,
        uri: image.image
      })) || []
    );

    setName(item.name);

    setOpenTime(item.lunch_start);
    setCloseTime(item.lunch_end);

    setTitle(item.title);
  }, [item]);

  useEffect(() => {
    const params = {
      category_id: CategoryId,
    };
    dispatch(get_sub_category(params));
  }, [CategoryId]);
  const openPhotoLibrary = () => {


    ImagePicker.openPicker({
      width: 1200,
      height: 800,
      cropping: true,

      maxFiles: 1
    })
      .then(images => {
        setPhoto(images);



      })
      .catch(err => {
        console.log(err);
        errorToast('Please reselect image');
      });
  };
  const handleSave = () => {
    const main = {
      uri: Photo?.path,
      type: Photo?.mime,
      name: Photo?.modificationDate,
    }



    const mainImageString = JSON.stringify(main);
    try {
      let data = new FormData();
      data.append('sub_category_id', SubCategoryId)

      data.append('main_image', main);
      data.append('property_id', item.id);
      data.append('cat_id', CategoryId);
      data.append('company_id', user?.id);
      data.append('name', name);
      data.append('amount', Price);
      data.append('address', LocationName);
      data.append('lat', Location?.latitude);
      data.append('lon', Location?.longitude);
      data.append('description', Description);
      data.append('book_online_mobile_number', MobileNumber);
      data.append('title', Title);
      data.append('lunch_start', OpenTime)
      data.append('lunch_end', CloseTime)
      data.append('no_of_guest_min', minGuest)
      data.append('no_of_guest_max', maxGuest)

      ApiImages.forEach((image, index) => {
        data.append(`image[${index}]`, image);
      });

      const params = {
        data: data,
        navigation: navigation,
      };

      dispatch(update_property(params));
    } catch (err) {
      console.log(err);

    }
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
      maxFiles: 10 - selectedImages.length, // Limit the number of images that can be selected to not exceed 10
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
    setApiImages(updatedSelectedImages)
  };


  const showDatePicker = picker => {
    setCurrentPicker(picker);
    setDatePickerVisibility(true);
  };

  const handleConfirm = date => {

    const newdate = new Date(date);

    const formattedTime = newdate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    switch (currentPicker) {

      case 'OpenTime':
        setOpenTime(formattedTime);
        break;
      case 'CloseTime':
        setCloseTime(formattedTime);
        break;

    }
    setDatePickerVisibility(false);
  };




  function isHTML(str) {
    const htmlPattern = /<\/?[a-z][\s\S]*>/i;
    return htmlPattern.test(str);
  }
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSelectLocation = useCallback(
    (details) => {
      const { lat, lng } = details.geometry.location;
      console.log('details', details.name);

      setLocationName(details.name);
      setLocation({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

    },
    [navigation]
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openImageLibrary()}>
      {item.image != null ? (
        <View style={{ position: 'relative', marginTop: 20 }}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={[
              styles.image,
              selectedImages.includes(item.id) && styles.selectedImage,
              {},
            ]}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeImage(item.id)}>
            <Image
              style={{ height: 5, width: 5 }}
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
      <View style={{
        width: '100%', bottom: 0,
        alignSelf: 'center',
        backgroundColor: '#fff'
      }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{localizationStrings.a_propert}</Text>
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.location}</Text>
        </View>
        <GooglePlacesInput placeholder={LocationName == '' ? 'Search' : LocationName} onPlaceSelected={handleSelectLocation} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Update Property</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>{localizationStrings.photo}</Text>
        </View>
        <TouchableOpacity onPress={() => openPhotoLibrary()}>

          {Photo?.path ? <View style={{ position: 'relative', borderRadius: 10 }}>
            <Image
              source={{ uri: Photo?.path }}
              resizeMode="contain"
              style={[
                styles.image,

                { width: '95%', height: hp(20), borderRadius: 10 },
              ]}
            />

          </View> :

            <View style={[styles.image, styles.cameraContainer]}>
              <Camera />
            </View>
          }
        </TouchableOpacity>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>{localizationStrings.G_photo}</Text>
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
            numColumns={5}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.name}</Text>
        </View>
        <View style={[styles.txtInput, fieldErrors.Title && styles.errorInput]}>
          <TextInputField
            placeholder="name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.title}</Text>
        </View>
        <View style={[styles.txtInput, fieldErrors.Title && styles.errorInput]}>
          <TextInputField
            placeholder="Title"
            value={Title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.category}</Text>
        </View>
        <View
          style={[
            styles.txtInput,
            fieldErrors.CategoryId && styles.errorInput,
          ]}>
          <Dropdown
            data={category}
            placeholder={localizationStrings.category}
            style={{ width: '100%' }}
            maxHeight={200}
            labelField="name"
            itemContainerStyle={{ marginTop: 10 }}
            containerStyle={{ marginTop: 30, borderRadius: 10 }}
            showsVerticalScrollIndicator={false}
            valueField="id"
            value={CategoryId}
            onChange={item => {
              setCategoryId(item.id);
              setCategory(item.name);
            }}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.SubCategory}</Text>
        </View>
        {subcategory?.length > 0 && <View
          style={[
            styles.txtInput,
            fieldErrors.CategoryId && styles.errorInput,
          ]}>
          <Dropdown
            data={subcategory}
            placeholder={localizationStrings.SubCategory}
            style={{ width: '100%' }}
            maxHeight={200}
            labelField="name"
            itemContainerStyle={{ marginTop: 10 }}
            containerStyle={{ marginTop: 30, borderRadius: 10 }}
            showsVerticalScrollIndicator={false}
            valueField="name"
            value={SubCategory}
            onChange={item => {
              setSubCategoryId(item.id);
              setSubCategory(item.name);
            }}
          />
        </View>}
        {!isHTML(item?.description) && <>
          <View style={styles.labelContainerWithMargin}>
            <Text style={styles.labelText}>{localizationStrings.Description}</Text>
          </View>
          <View
            style={[
              styles.txtInput,
              fieldErrors.Description && styles.errorInput,
            ]}>
            <TextInputField
              placeholder={localizationStrings.G_photo}
              value={Description}
              onChangeText={setDescription}
            />
          </View>
        </>
        }
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.minimum_no_of_guest}</Text>
        </View>
        <View
          style={[
            styles.txtInput,
            fieldErrors.minGuest && styles.errorInput,
          ]}>
          <TextInputField
            placeholder={localizationStrings.minimum_no_of_guest}
            keyboardType={'number-pad'}

            value={minGuest}
            onChangeText={setminGuest}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.maximum_no_of_guest}</Text>
        </View>
        <View
          style={[
            styles.txtInput,
            fieldErrors.maxGuest && styles.errorInput,
          ]}>
          <TextInputField
            placeholder={localizationStrings.maximum_no_of_guest}
            keyboardType={'number-pad'}

            value={maxGuest}
            onChangeText={setmacGuest}
          />
        </View>
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.Mobile_number}</Text>
        </View>
        <View
          style={[
            styles.txtInput,
            fieldErrors.MobileNumber && styles.errorInput,
          ]}>
          <TextInputField
            placeholder={localizationStrings.Mobile_number}
            keyboardType={'number-pad'}
            value={MobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.labelContainerWithMargin, { width: '45%' }]}>
            <Text style={styles.labelText}>{localizationStrings.Open_Time}</Text>
          </View>
          <View style={[styles.labelContainerWithMargin, { width: '45%' }]}>
            <Text style={styles.labelText}>{localizationStrings.Close_Time}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[
              styles.txtInput,
              { width: '45%' },

            ]}
            onPress={() => showDatePicker('OpenTime')}>
            <Text style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>
              {OpenTime}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.txtInput,
              { width: '45%' },

            ]}
            onPress={() => showDatePicker('CloseTime')}>
            <Text style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>
              {CloseTime}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={new Date()}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <View style={styles.labelContainerWithMargin}>
          <Text style={styles.labelText}>{localizationStrings.price}</Text>
        </View>
        <View style={[styles.txtInput, fieldErrors.Price && styles.errorInput]}>
          <TextInputField
            placeholder={localizationStrings.price}
            value={Price}
            keyboardType={'number-pad'}
            onChangeText={setPrice}
          />
        </View>
        <View style={{ height: hp(15) }} />
      </ScrollView>
      {!keyboardOpen && <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Update</Text>
      </TouchableOpacity>}
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
    left: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFF',
    lineHeight: 25.5,
    marginLeft: 10,
    fontFamily: 'Federo-Regular',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Federo-Regular',
  },
  labelContainerWithMargin: {
    paddingLeft: 20,
    marginTop: 25,
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
    width: 55,

    height: 55,
    borderRadius: 10,
    resizeMode: 'cover',
    marginLeft: 15,
    margin: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  cameraContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderStyle: 'dashed',
  },
  txtInput: {
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#777777',
    marginTop: 10,
    paddingRight: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
});
