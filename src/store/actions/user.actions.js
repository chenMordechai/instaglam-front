import { userService } from "../../services/user.service.js";
import { ADD_USER, REMOVE_USER, SET_USERS, UPDATE_USER, SET_IS_LOADING, SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";


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