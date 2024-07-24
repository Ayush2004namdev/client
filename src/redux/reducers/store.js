import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import api from '../api/api';
import miscSlice from '../slices/misc';
import chatSlice from '../slices/chat';

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        api:api.reducer,
        misc:miscSlice.reducer,
        chat:chatSlice.reducer
    },
    middleware: (mid) => [...mid(),api.middleware]
})


export default store;