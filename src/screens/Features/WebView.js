import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, View, Text, BackHandler, Image, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ExitConfirmationModal from '../../configs/ExitConfirmationModal';
// import BackNav from "../../assets/svg/BackNav.svg"
import RightArrow from '../../assets/svg/RightArrow.svg';
import localizationStrings from '../../utils/Localization';
import { add_booking } from '../../redux/feature/featuresSlice';
import ScreenNameEnum from '../../routes/screenName.enum';
const WebViewScreen = ({ route, }) => {
    const userDetails = useSelector((state) => state?.user?.user)
    const { url, fromData } = route?.params
    const [modalVisible, setModalVisible] = useState(false);
    const [webView, setwebView] = useState(true);
    const [Succuss, setSuccuss] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation()


    const onNavigationStateChange = async navState => {



        const filename = navState?.url?.split('/')?.pop()?.split('?')[0].split('#')[0];


        if (navState.url.includes('paystripedata_booking')) {

            setSuccuss(true)

            await submitBooking();



        }
        else if (filename == 'paystripe_cancel_booking') {
            setModalVisible(true)


        }

        else {

        }

    };
    const submitBooking = () => {
        try {
            const params = {
                data: fromData,


                navigation: navigation,
            };
            dispatch(add_booking(params)).then(res => {
               
            })
        }
        catch (erro) {
            console.log('err', erro);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                // Show the modal when the back button is pressed
                setModalVisible(true);
                return true; // Prevent default back button behavior
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[Succuss && styles.containerCenter, { flex: 1, backgroundColor: "#fff", }]}>

                {webView && !modalVisible && !Succuss && <WebView
                    source={{ uri: url }}
                    javaScriptEnabled
                    onNavigationStateChange={onNavigationStateChange}
                    style={{ flex: 1 }}
                    allowsFullscreenVideo
                    pullToRefreshEnabled
                    geolocationEnabled={true}
                    scalesPageToFit={false}
                    injectedJavaScriptBeforeContentLoaded={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
                    injectedJavaScript={`document.getElementsByClassName("elementor-search-form__container")[0].style="padding:10px 10px";`}
                />
                }


                {Succuss &&


                    <Image source={require('../../assets/paymentdone.png')} style={{ height: '80%', width: '80%' }}
                        resizeMode='contain' />


                }
                <ExitConfirmationModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </View>
        </SafeAreaView>

    );
}
export default WebViewScreen;

const styles = StyleSheet.create({

    containerCenter: {
        justifyContent: 'center', alignItems: 'center',
    },
    container: {
        overflow: "hidden",

        justifyContent: "center",


        justifyContent: "center",
        alignItems: "center"

    },
})