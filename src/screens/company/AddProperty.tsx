import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Camera from '../../assets/svg/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import {errorToast} from '../../configs/customToast';
import TextInputField from '../../configs/TextInput';
import {Dropdown} from 'react-native-element-dropdown';
export default function AddProperty() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [Title, setTitle] = useState('');
 
  const [value, setValue] = useState<string | null>(null);
  const handleSave = () => {
  
  };
  const openImageLibrary = () => {
    if (selectedImages.length == 10) {
      errorToast('Maximum Limit Reached');
      return;
    }

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImages([
          ...selectedImages,
          {id: selectedImages.length + 1, image: {uri: image.path}},
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => openImageLibrary()}>
      {item.image != null && (
        <Image
          source={item.image}
          style={[
            styles.image,
            selectedImages.includes(item.id) && styles.selectedImage,
          ]}
        />
      )}

      {item.image == null && (
        <View style={[styles.image, styles.cameraContainer]}>
          <Camera />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Add Property</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Photo</Text>
      </View>
      <View>
      <FlatList
        data={
          selectedImages.length < 10
            ? [...selectedImages, {id: selectedImages.length + 1, image: null}]
            : selectedImages
        }
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={5}
      />
      </View>

      <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Title</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="Title"
                value={Title}
                onChangeText={setTitle}
              />
            </View>
      <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Category</Text>
            </View>
            <View style={styles.txtInput}>
            <Dropdown
                  data={DropData}
                  placeholder="select category"
                  style={{width: '100%'}}
                  maxHeight={200}
                  labelField="name"
                  itemContainerStyle={{marginTop: 10}}
                  containerStyle={{marginTop: 30, borderRadius: 10}}
                  showsVerticalScrollIndicator={false}
                  valueField="name"
                  onChange={item => {
                    setValue(item.name);
                    setIsFocus(false);
                  }}
                />
            </View>
      <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Description</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="description"
                value={Title}
                onChangeText={setTitle}
              />
            </View>
      <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Location</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="location"
                value={Title}
                onChangeText={setTitle}
              />
            </View>
      <View style={styles.labelContainerWithMargin}>
              <Text style={[styles.labelText,{fontSize:18}]}>Opening hours</Text>
            </View>
            <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Lunch</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="time"
                value={Title}
                lastIcon={require('../../assets/Cropping/clock.png')}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Dinner</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="time"
                value={Title}
                onChangeText={setTitle}
                lastIcon={require('../../assets/Cropping/clock.png')}
                
              />
            </View>
            <View style={styles.labelContainerWithMargin}>
              <Text style={styles.labelText}>Price</Text>
            </View>
            <View style={styles.txtInput}>
              <TextInputField
                placeholder="price"
                value={Title}
                onChangeText={setTitle}
              />
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Post Add</Text>
        </TouchableOpacity>
            <View  style={{height:hp(10)}} />
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    saveButton: {
       
            height:60,
    
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
        marginTop:25,
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
  addButton: {
    backgroundColor: '#874BE9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtInput: {
    height: 50,
    marginHorizontal: 10,
    
    borderRadius:10,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    borderColor:'#777777',
    marginTop:10,
    paddingRight: 10,
  },
});


const DropData = [
    {
      name: 'Hotel',
    },
    {
      name: 'Restaurant',
    },
    {
      name: 'Shop',
    },
    {
      name: 'Company',
    },
    
  ];