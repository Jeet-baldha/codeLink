import {createSlice } from '@reduxjs/toolkit'

const intialState = {
    userName : '',
    language :'',
    fontSize : 14,
    theme: 'ambiance',
    loginStatus :'',
    userId:'',
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
            state.userId = action.payload.userId;
            state.userName=action.payload.userName;
            localStorage.setItem('userId', action.payload.userId);
            localStorage.setItem('userName', action.payload.userName);
        },

        logout : (state) => {
            state.loginStatus = false;
            state.userId = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }

    }

})

export const {login,logout,updateUserDetails}  = userSlice.actions;
export default userSlice;