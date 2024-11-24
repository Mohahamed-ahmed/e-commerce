import { configureStore ,createSlice } from "@reduxjs/toolkit";
import CartSlice from "./cartSlice";
import userSlice from "./userSlice";
import notificationSlice from "./Notification";

const initialState = {
    isAuthenticated:false
}

const AuthenticationSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state){
            state.isAuthenticated = true
        },
        logout(state){
            state.isAuthenticated = false
        }
    }
})

const store = configureStore({
    reducer: {auth: AuthenticationSlice.reducer, cart:CartSlice.reducer , user: userSlice.reducer, notification:notificationSlice.reducer}
})

export const authActions = AuthenticationSlice.actions; // there is no actions but i defined it for me

export default store