import { createSlice } from "@reduxjs/toolkit";

const notiInitialState = {
    isChanged :false,
    notification:{}
}

const notificationSlice = createSlice({
    name:'notification',
    initialState:notiInitialState,
    reducers:{
        passNotification(state,action){
            state.isChanged = true
            state.notification = action.payload
        }
    }
})

export const notificationActions = notificationSlice.actions

export default notificationSlice