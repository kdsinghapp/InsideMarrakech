
import TabNavigator from "../navigators/TabNavigator";
import forgotPassword from "../screens/auth/forgotPassword";
import Login from "../screens/auth/Login";
import LoginOption from "../screens/auth/LoginOption";
import SendOtp from "../screens/auth/SendOtp";
import signup from "../screens/auth/Signup";
import ValidOtp from "../screens/auth/ValidOtp";
import Booking from "../screens/BottomTab/Booking";
import Home from "../screens/BottomTab/Home";
import Profile from "../screens/BottomTab/Profile";
import Search from "../screens/BottomTab/Search";
import Chat from "../screens/chat/Chat";
import ChatPage from "../screens/chat/ChatPage";
import AddMenu from "../screens/company/AddMenu";
import AddProperty from "../screens/company/AddProperty";
import CbookingDetails from "../screens/company/CbookingDetails";
import CompanyBooking from "../screens/company/CompanyBooking";
import CProfile from "../screens/company/CProfile";
import updateProperty from "../screens/company/updateProperty";
import AddTravelerDetails from "../screens/Features/AddTravelerDetails";
import BookingDetails from "../screens/Features/BookingDetails";
import FullscreenImageScreen from "../screens/Features/FullscreenImageScreen";
import Gallery_Screen from "../screens/Features/Gallery_Screen";
import PaymentDetails from "../screens/Features/PaymentDetails";
import PaymentSuccess from "../screens/Features/PaymentSuccess";
import PlaceDetails from "../screens/Features/PlaceDetails";
import MapScreen from "../screens/Map";
import AboutUs from "../screens/ProfileSection/AboutUs";
import BookingTab from "../screens/ProfileSection/BookingTab";
import ChangePassword from "../screens/ProfileSection/ChangePassword";
import EditProfile from "../screens/ProfileSection/EditProfile";
import FAQ from "../screens/ProfileSection/FAQ";
import MsgNotification from "../screens/ProfileSection/MsgNotification";
import Notification from "../screens/ProfileSection/Notification";
import PrivacyPolicy from "../screens/ProfileSection/PrivacyPolicy";
import Subscription from "../screens/ProfileSection/Subscription";
import TermCondition from "../screens/ProfileSection/TermCondition";
import WishList from "../screens/ProfileSection/WishList";
import SplashScreen from "../screens/SplashScreen";
import WellcomeScreen from "../screens/WellcomeScreen";
import localizationStrings from "../utils/Localization";
import ScreenNameEnum from "./screenName.enum";


const _routes = {

  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component:SplashScreen,
    },
    {
      name: ScreenNameEnum.WELLCOME_SCREEN,
      Component:WellcomeScreen,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component:Login,
    },
    {
      name: ScreenNameEnum.SIGNUP_SCREEN,
      Component:signup,
    },
    {
      name: ScreenNameEnum.SENT_OTP,
      Component:SendOtp,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component:ValidOtp,
    },
    {
      name: ScreenNameEnum.FORGOT_PASSWORD,
      Component:forgotPassword,
    },
    {
      name: ScreenNameEnum.BOTTOM_TAB,
      Component:TabNavigator,
    },
    {
      name: ScreenNameEnum.EDIT_PROFILE,
      Component:EditProfile,
    },
    {
      name: ScreenNameEnum.CHANGE_PASSWORD,
      Component:ChangePassword,
    },
    {
      name: ScreenNameEnum.WISHLIST_SCREEN,
      Component:WishList,
    },
    {
      name: ScreenNameEnum.BOOKING_TAB,
      Component:BookingTab,
    },
    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component:Notification,
    },
    {
      name: ScreenNameEnum.PRIVACY_POLICY,
      Component:PrivacyPolicy,
    },
    {
      name: ScreenNameEnum.TERM_CONDITION,
      Component:TermCondition,
    },
    {
      name: ScreenNameEnum.SUBSCRIPTION_SCREEN,
      Component:Subscription,
    },
    {
      name: ScreenNameEnum.PLACE_DETAILS,
      Component:PlaceDetails,
    },
    {
      name: ScreenNameEnum.BOOKING_DETAILS,
      Component:BookingDetails,
    },
    {
      name: ScreenNameEnum.TRAVELER_DETAILS,
      Component:AddTravelerDetails,
    },
    {
      name: ScreenNameEnum.PAYMENT_DETAILS,
      Component:PaymentDetails,
    },
    {
      name: ScreenNameEnum.PAYMENT_SUCCESS,
      Component:PaymentSuccess,
    },
    {
      name: ScreenNameEnum.CHAT_CONTACT_SCREEN,
      Component:ChatPage,
    },
    {
      name: ScreenNameEnum.CHAT_SCREEN,
      Component:Chat,
    },
    {
      name: ScreenNameEnum.LOGIN_OPTION,
      Component:LoginOption,
    },
    {
      name: ScreenNameEnum.ADD_PROPERTY,
      Component:AddProperty,
    },
    {
      name: ScreenNameEnum.CompanyBooking,
      Component:CompanyBooking,
    },
    {
      name: ScreenNameEnum.CbookingDetails,
      Component:CbookingDetails,
    },
    {
      name: ScreenNameEnum.AddMenu,
      Component:AddMenu,
    },
    {
      name: ScreenNameEnum.updateProperty,
      Component:updateProperty,
    },
    {
      name: ScreenNameEnum.ABOUT_US,
      Component:AboutUs,
    },
    {
      name: ScreenNameEnum.FAQ_SCREEN,
      Component:FAQ,
    },
    {
      name: ScreenNameEnum.MsgNotification,
      Component:MsgNotification,
    },
    {
      name: ScreenNameEnum.MAP_SCREEN,
      Component:MapScreen,
    },
    {
      name: ScreenNameEnum.Gallery_Screen,
      Component:Gallery_Screen,
    },
    {
      name: ScreenNameEnum.FullscreenImageScreen,
      Component:FullscreenImageScreen,
    },
    
  ],
  HOME_ROUTE: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component:Home,
    },
  
   
 

    
    
   ],
  // PROFILE_ROUTE: [
 
   
   
    
//  ],




};
console.log('Localization for Home:', localizationStrings.Home);
export default _routes;
