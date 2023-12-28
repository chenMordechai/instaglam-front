import { userService } from "../../services/user.service.js";

export const SET_USERS = 'SET_USER'
export const SET_USER = 'SET_USER'
export const ADD_USER = 'SET_USER'
export const REMOVE_USER = 'SET_USER'
export const UPDATE_USER = 'SET_USER'
export const SET_IS_LOADING = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        default:
            return state;
    }
}