import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';
import {Alert} from 'react-native';
import {errorToast, successToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  PrivacyPolicy: null,
  TermsCondition: null,
  CategoryList: null,
  BookingList: [],
  BookingCompleteList: [],
  BookingCancelList: [],
  CBookingList: [],
  CBookingCompleteList: [],
  CBookingCancelList: [],
  allProperty: null,
  CompanyProperty: null,
  MenuList: [],
  propertyDetail:[],
  ChatUser:[],
};

export const update_notification = createAsyncThunk(
  'update_notification',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const response = await API.post('/update_notification', params, config);
      console.log(
        '==============update_notification======================',
        response.data,
      );
      if (response.data.status === '1') {
        // Do something on success
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_user_booking_list = createAsyncThunk(
  'get_user_booking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '==============get_user_booking_list======================',
        params,
      );
      const response = await API.post('/get_user_booking_list', params, config);

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        thunkApi.dispatch(updateBookingList([]));
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_user_Canclebooking_list = createAsyncThunk(
  'get_user_Canclebooking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '==============get_user_booking_list======================',
        params,
      );
      const response = await API.post('/get_user_booking_list', params, config);

      if (response.data.status === '1') {
        return response.data.data;
      } else {
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_user_Completebooking_list = createAsyncThunk(
  'get_user_Completebooking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '==============get_user_booking_list======================',
        params,
      );
      const response = await API.post('/get_user_booking_list', params, config);

      if (response.data.status === '1') {
        return response.data.data;
      } else {
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_Company_booking_list = createAsyncThunk(
  'get_Company_booking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post(
        '/get_company_booking_list',
        params,
        config,
      );
      console.log(
        '==============get_Company_booking_list===response===================',
        response.data,
      );

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_Company_Canclebooking_list = createAsyncThunk(
  'get_Company_Canclebooking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '==============get_Company_Canclebooking_list======================',
        params,
      );

      const response = await API.post(
        '/get_company_booking_list',
        params,
        config,
      );

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_Company_Completebooking_list = createAsyncThunk(
  'get_Company_Completebooking_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post(
        '/get_company_booking_list',
        params,
        config,
      );
      console.log(
        '==============get_Company_Completebooking_list==response====================',
        response.data,
      );

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_property_detail = createAsyncThunk(
  'get_property_detail',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post(
        '/get_property_detail',
        params,
        config,
      );
      console.log(
        '==============get_property_detail==response====================',
        response.data,
      );

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const booking_request_accept_reject = createAsyncThunk(
  'booking_request_accept_reject',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '==============booking_request_accept_reject======================',
        params,
      );
      const response = await API.post(
        '/booking_request_accept_reject',
        params,
        config,
      );

      if (response.data.status === '1') {
        successToast(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      let data = new FormData();
      data.append('user_id', params.data.user_id);
      data.append('mobile', params.data.mobile);
      data.append('first_name', params.data.first_name);
      data.append('last_name', params.data.last_name);
      data.append('dob', params.data.dob);
      data.append('home_town', params.data.home_town);
      data.append('image', params.data.image);
      data.append('email', params.data.email);
      data.append('company_name', params.data.company_name);
      data.append('vat_number', params.data.vat_number);
      data.append('company_address', params.data.company_address);

      const response = await API.post('/update_profile', data, config);
      console.log(
        '==============update_profile======================',
        response.data,
      );
      if (response.data.status === '1') {
        successToast('Profile Update Successfuly');
        if (params.type === 'User') {
          params.navigation.navigate(ScreenNameEnum.PROFILE_SCREEN);
        } else {
          params.navigation.navigate(ScreenNameEnum.CProfile);
        }
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const add_property = createAsyncThunk(
  'add_property',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      console.log('=============add_property=======================');
      console.log(params.data);
      console.log('====================================');
      const response = await API.post('/add_property', params.data, config);

      if (response.data.status === '1') {
        params.navigation.goBack();
        console.log(
          '==============add_property======================',
          response.data,
        );
        successToast(response.data.message);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_property = createAsyncThunk(
  'update_property',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      console.log('=============update_property=======================');
      console.log(params.data);
   
      const response = await API.post('/update_property', params.data, config);

      console.log(
        '==============update_property======================',
        response.data,
      );
      if (response.data.status === '1') {
        successToast(response.data.message)
        params.navigation.goBack();
       
        successToast(response.data.message);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_property_menu = createAsyncThunk(
  'add_property_menu',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      console.log('=============add_property_menu=======================');
      console.log(params.data);
      console.log('====================================');
      const response = await API.post(
        '/add_property_menu',
        params.data,
        config,
      );

      if (response.data.status === '1') {
        params.navigation.goBack();
        console.log(
          '==============add_property_menu======================',
          response.data,
        );
        successToast(response.data.message);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const add_booking = createAsyncThunk(
  'add_booking',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      let data = new FormData();
      data.append('user_id', params.data.user_id);
      data.append('property_id', params.data.property_id);
      data.append('first_name', params.data.first_name);
      data.append('last_name', params.data.last_name);
      data.append('email', params.data.email);
      data.append('mobile', params.data.mobile);
      data.append('driver_id', params.data.driver_id);
      data.append('language', params.data.language);
      data.append('address', params.data.address);
      data.append('lat', params.data.lat);
      data.append('lon', params.data.lon);
      data.append('amount', params.data.amount);
      data.append('created_date', params.data.created_date);

      // Append user individually
      params.data.GuestList.forEach((guest, index) => {
        data.append(`first_name1[${index}]`, guest.firstName);
        data.append(`last_name1[${index}]`, guest.lastName);
      });

      console.log('================data====================');
      console.log(data);
      console.log('====================================');

      const response = await API.post('/add_booking', data, config);
      console.log(
        '==============add_booking======================',
        response.data,
      );
      if (response.data.status === '1') {
        successToast(response.data.message);
        params.navigation.navigate(ScreenNameEnum.PAYMENT_SUCCESS);
      } else {
        errorToast(response.data.message);
      }
      return response.data;
    } catch (error) {
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      console.log('=============get_privacy_policy=======================');

      const response = await API.get('/get_privacy_policy');

      if (response.data.status === '1') {
        // Do something on success
      } else {
        // Handle the error
      }
      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const delete_property = createAsyncThunk(
  'delete_property',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
data.append('property_id', params.property_id);
data.append('company_id', params.company_id);

      console.log('=============delete_property=======================',params,);

      const response = await API.post('/delete_property',data,config);

      if (response.data.status === '1') {
        successToast(response.data.message)
        params.navigation.goBack()
      } else {
        errorToast(response.data.message)
      }
      return response.data.data;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_chat_user = createAsyncThunk(
  'get_chat_user',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
data.append('user_id', params.user_id);


      console.log('=============get_chat_user=======================',params,);

      const response = await API.post('/get_chat_user',data,config);
      console.log('=============get_chat_user=======================',response.data,);
      if (response.data.status === '1') {
       
      } else {
        errorToast('No Chat Found')
      }
      return response.data.data;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      console.log('=============get_terms_conditions=======================');

      const response = await API.get('/get_terms_conditions');

      if (response.data.status === '1') {
        // Do something on success
      } else {
        // Handle the error
      }
      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_all_property = createAsyncThunk(
  'get_all_property',
  async (params, thunkApi) => {
    try {
      console.log('=============get_all_property=======================');

      const response = await API.get('/get_all_property');

      if (response.data.status === '1') {
        // Do something on success
      } else {
        // Handle the error
      }
      return response.data.data;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_company_all_property = createAsyncThunk(
  'get_company_all_property',
  async (params, thunkApi) => {
    try {
      console.log(
        '=============get_all_property=======================',
        params,
      );
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      let data = new FormData();
      data.append('company_id', params.company_id);
      const response = await API.post(
        '/get_company_all_property',
        data,
        config,
      );

      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
   
    } catch (error) {
      console.log('Error:', error);
      //errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_category = createAsyncThunk(
  'get_category',
  async (params, thunkApi) => {
    try {
      console.log('=============get_category=======================');

      const response = await API.get('/get_category');

      if (response.data.status === '1') {
        // Do something on success
      } else {
        // Handle the error
      }
      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const get_property_menu = createAsyncThunk(
  'feature/get_property_menu',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      console.log(
        '==============get_property_menu call======================',
        params,
      );

      const response = await API.post('/get_property_menu', params, config);
      if (response.data.status === '1') {
        return response.data.data;
      } else {
        return thunkApi.rejectWithValue(response.data.data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(response.data.data);
    }
  },
);
const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(update_notification.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_notification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_notification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_user_booking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_user_booking_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BookingList = action.payload.length ? action.payload : [];
    });
    builder.addCase(get_user_booking_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_user_Completebooking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      get_user_Completebooking_list.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.BookingCompleteList = action.payload.length ? action.payload : [];
      },
    );
    builder.addCase(get_user_Completebooking_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_user_Canclebooking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_user_Canclebooking_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BookingCancelList = action.payload.length ? action.payload : [];
    });
    builder.addCase(get_user_Canclebooking_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_chat_user.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_chat_user.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ChatUser = action.payload 
    });
    builder.addCase(get_chat_user.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.ChatUser = []
    });
    builder.addCase(booking_request_accept_reject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      booking_request_accept_reject.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      },
    );
    builder.addCase(booking_request_accept_reject.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_property_menu.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_property_menu.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.MenuList = action.payload;
    });
    builder.addCase(get_property_menu.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.MenuList = [];
    });
    builder.addCase(get_property_detail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_property_detail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.propertyDetail = action.payload;
    });
    builder.addCase(get_property_detail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.propertyDetail = [];
    });
    builder.addCase(get_Company_booking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_Company_booking_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.CBookingList = action.payload;
    });
    builder.addCase(get_Company_booking_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.CBookingList = [];
    });
    builder.addCase(get_Company_Completebooking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      get_Company_Completebooking_list.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CBookingCompleteList = action.payload;
      },
    );
    builder.addCase(
      get_Company_Completebooking_list.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.CBookingCompleteList = [];
      },
    );
    builder.addCase(get_Company_Canclebooking_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      get_Company_Canclebooking_list.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CBookingCancelList = action.payload;
      },
    );
    builder.addCase(
      get_Company_Canclebooking_list.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.CBookingCancelList = [];
      },
    );

    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_property_menu.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_property_menu.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_property_menu.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_booking.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_booking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_booking.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PrivacyPolicy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_terms_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_terms_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TermsCondition = action.payload;
    });
    builder.addCase(get_terms_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_all_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_all_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.allProperty = action.payload;
    });
    builder.addCase(get_all_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.allProperty = []
    });
    builder.addCase(get_company_all_property.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_company_all_property.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.CompanyProperty = action.payload;
    });
    builder.addCase(get_company_all_property.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.CompanyProperty = []
    });
    builder.addCase(get_category.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_category.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.CategoryList = action.payload;
    });
    builder.addCase(get_category.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const {updateBookingList} = FeatureSlice.actions;

export default FeatureSlice.reducer;
