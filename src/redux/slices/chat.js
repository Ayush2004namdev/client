import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/Constant";

const data = getOrSaveFromLocalStorage({key:NEW_MESSAGE_ALERT , get:true}) 

const initialState = {
    notificationCount : 0,
    newMessageAlert: data || [{
        chatId:"",
        count:0,
    }]
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        notificationCountIncrement : (state) => {
            state.notificationCount++ ;
        },
        resetNotificationCount:(state) => {
            state.notificationCount = 0;
        },
        setMessageCount:(state,action) => {
            const chatId = action.payload?.chatId
            const index = state.newMessageAlert.findIndex((message) => message?.chatId === chatId);
            if (index !== -1) {
                state.newMessageAlert[index].count++;
            } else {
                state.newMessageAlert.push({ chatId, count: 1 });
            }
        },
        removeMessageAlertCount : (state,action) => {
            const chatId = action.payload.chatId;
            state.newMessageAlert = state.newMessageAlert.filter((chat) => chat.chatId !== chatId);
        }
    }
})


export default chatSlice;
export const {resetNotificationCount, notificationCountIncrement , setMessageCount , removeMessageAlertCount} = chatSlice.actions