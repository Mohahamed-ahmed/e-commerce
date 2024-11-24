import { createSlice } from "@reduxjs/toolkit";
import authServices from "../src/components/Services/auth"; 
import { getToken } from "../src/utils/auth";
import { logout ,getProfile} from "../src/components/Services/auth";
import { getRefreshToken } from "../src/components/Services/auth";


const initilaUserState = {
    isAuthenticated:false,
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState: initilaUserState,
    reducers:{

        setUser(state,action){
            state.isAuthenticated = true
            state.user = action.payload.user
        },
        clearUser(state){
            state.isAuthenticated = false
            state.user=null
        }
    }
})

export const logouth = ()=>{
    return async (dispatch)=>{
        try{
            await logout()
            localStorage.removeItem('token')
            dispatch(userActions.clearUser())
        }catch(error){
            console.log(error)
            localStorage.removeItem('token')
            dispatch(userActions.clearUser())
        }
    }
}

// Provide persistence for user Data when refreshing the app
export const getUserData = ()=>{
    return async (dispatch)=>{
        try{
            const {user} = await getProfile()
            dispatch(userActions.setUser({user:user}))

        }catch(error){
            console.log(error)
        }
    }
}

// handle refesh token request (Set new acces token when current expires)
export const refreshTokenHandler = (reExecuteFunction) => {
    return async (dispatch) => {
      try {
        await getRefreshToken();
  
        // re-execute a function again after setting the new token
        await reExecuteFunction();
      } catch (error) {
        dispatch(logout());
      }
    };
  };

export const userActions = userSlice.actions

export default userSlice