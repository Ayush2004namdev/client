import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isLoading:true,
    isAdmin:false
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userExists:(state,action) => {
            state.user = action.payload
            state.isLoading = false
        },
        userNotExist: (state,action) => {
            state.user = null;
            state.isLoading = true
        }
    }
})

export default userSlice;

export const {userExists,userNotExist} = userSlice.actions