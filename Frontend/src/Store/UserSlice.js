import {createSlice } from '@reduxjs/toolkit'

const intialState = {
    username : localStorage.getItem('username') || '',
    language : '',
    fontSize :14,
    theme: localStorage.getItem('theme') || 'chrome' ,
    loginStatus :'',
    roomId:''
}

const userSlice = createSlice ({

    name:'user',
    initialState:intialState,
    reducers: {

        updateUserDetails: (state,action) =>{
            const {language,theme,roomId,fontSize} = action.payload
            state.language = language ? language : state.language;
            state.theme = theme ? theme : state.theme;
            state.roomId = roomId ? roomId : state.roomId;
            state.fontSize = fontSize ? fontSize : state.fontSize;

            localStorage.setItem('theme', theme ? theme : state.theme);
            localStorage.setItem('language', language ? language : state.language);
            localStorage.setItem('roomId', roomId ? roomId : state.roomId);
            localStorage.setItem('fontSize', fontSize ? fontSize : state.fontSize);
        },

        login: (state,action) => {
            state.loginStatus = true;
            state.username=action.payload.username;
            localStorage.setItem('username', action.payload.username);
        },

        logout : (state) => {
            state.loginStatus = false;
            state.username = '';
            localStorage.removeItem('username');
            localStorage.removeItem('authToken');
        }

    }

})

export const {login,logout,updateUserDetails}  = userSlice.actions;
export default userSlice;