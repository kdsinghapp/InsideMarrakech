
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
import AddTravelerDetails from "../screens/Features/AddTravelerDetails";
import BookingDetails from "../screens/Features/BookingDetails";
import PaymentDetails from "../screens/Features/PaymentDetails";
import PaymentSuccess from "../screens/Features/PaymentSuccess";
import PlaceDetails from "../screens/Features/PlaceDetails";
import BookingTab from "../screens/ProfileSection/BookingTab";
import ChangePassword from "../screens/ProfileSection/ChangePassword";
import EditProfile from "../screens/ProfileSection/EditProfile";
import Notification from "../screens/ProfileSection/Notification";
import PrivacyPolicy from "../screens/ProfileSection/PrivacyPolicy";
import Subscription from "../screens/ProfileSection/Subscription";
import TermCondition from "../screens/ProfileSection/TermCondition";
import WishList from "../screens/ProfileSection/WishList";
import SplashScreen from "../screens/SplashScreen";
import WellcomeScreen from "../screens/WellcomeScreen";
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
    
  ],
  HOME_ROUTE: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component:Home,
    },
  
   
 

    
    
   ],
  // PROFILE_ROUTE: [
 
   
   
    
//  ],


  BOTTOMTAB_ROUTE:[
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component:Home,
      logo:require('../assets/Cropping/Home.png'),
      lable:'Home',
      logo2:require('../assets/Cropping/Home2x.png'),
    },
    {
      name: ScreenNameEnum.SEARCH_SCREEN,
      Component:Search,
      logo:require('../assets/Cropping/Search2x.png'),
      logo2:require('../assets/Cropping/Search2x.png'),
      lable:'Search'
    },
    
    {
      name: ScreenNameEnum.BOOKING_SCREEN,
      Component:Booking,
      logo:require('../assets/Cropping/Booking2x.png'),
      logo2:require('../assets/Cropping/BookingActive2.png'),
      lable:'Booking'
    },
  
    {
      name: ScreenNameEnum.PROFILE_SCREEN,
      Component:Profile,
      logo:require('../assets/Cropping/Profile2x.png'),
      logo2:require('../assets/Cropping/ProfileActive2.png'),
      lable:'Profile'
    },

 
  ]

};

export default _routes;
