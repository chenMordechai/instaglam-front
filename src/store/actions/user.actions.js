import { userService } from "../../services/user.service.js";
import {SET_USERS,SET_USER, ADD_USER, REMOVE_USER, UPDATE_USER, SET_IS_LOADING } from "../reducers/user.reducer.js";
import { store } from "../store.js";


export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err

    }
}

export async function loadUsers() {
    // const { filterBy } = store.getState().postModule
    // const { sortBy } = store.getState().postModule
    try {
        const users = await userService.query()
        // console.log('users:', users)
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('user action -> Cannot load users', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }

}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}
