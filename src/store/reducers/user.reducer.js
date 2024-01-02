import { userService } from "../../services/user.service.js";

export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {
    let users
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case UPDATE_USER:
            users = state.users.map(user => user._id === action.user._id ? action.user : user)
             return { ...state, users }
    
        default:
            return state;
    }
}