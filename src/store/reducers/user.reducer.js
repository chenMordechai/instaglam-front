import { userService } from "../../services/user.service.js";

export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_IMG = 'UPDATE_USER_IMG'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const ADD_FOLLOWING = 'ADD_FOLLOWING'
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    currUser:null
}

export function userReducer(state = initialState, action = {}) {
    let users
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_USER:
            return { ...state, currUser: action.user }
        case SET_LOGGEDIN_USER:
            return { ...state, loggedinUser: action.user }
        // case UPDATE_USER_IMG:
        //     users = state.users.map(user => user._id === action.user._id ? { ...user, ...action.user } : user)
        //     return { ...state, users }
        case ADD_FOLLOWING:
                      return { ...state, currUser: { ...state.currUser, followers: [...state.currUser.followers, action.loggedinUser] } }
        case REMOVE_FOLLOWING:
            return { ...state, currUser: { ...state.currUser, followers: state.currUser.followers.filter(f=>f._id !== action.loggedinUserId) } }
        default:
            return state;
    }
}
