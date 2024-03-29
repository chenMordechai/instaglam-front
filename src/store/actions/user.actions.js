import { userService } from "../../services/user.service.js";
import { msgService } from "../../services/msg.service.js";
import { socketService } from "../../services/socket.service.js";
import {UPDATE_USER_MSG_ID, SET_USERS, SET_USER, SET_LOGGEDIN_USER, UPDATE_USER_NOTIFICATIONS, SET_LOGGEDIN_USER_IMG, UPDATE_USER_IMG, UPDATE_USER, ADD_USER, REMOVE_USER, SET_IS_LOADING, ADD_FOLLOWING, REMOVE_FOLLOWING } from "../reducers/user.reducer.js";
import { store } from "../store.js";


export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        const { _id, fullname, username, imgUrl } = user
        const miniUser = { _id, fullname, username, imgUrl }
        store.dispatch({ type: SET_LOGGEDIN_USER, user: miniUser })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err

    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: ADD_USER, user })
        const { _id, fullname, username, imgUrl } = user
        const miniUser = { _id, fullname, username, imgUrl }
        store.dispatch({ type: SET_LOGGEDIN_USER, user: miniUser })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function loadUsers(filterBy) {
    try {
        const users = await userService.query(filterBy)
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('user action -> Cannot load users', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('user action -> Cannot load user', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_LOGGEDIN_USER, user: null })
        socketService.logout()
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }

}

export async function saveUser(user) {
    try {
        const userToSave = await userService.update(user)
        store.dispatch({ type: SET_USER, user: user })
        // const miniUser = {
        //     _id: user._id,
        //     username: user.username,
        //     fullname: user.fullname,
        //     imgUrl: user.imgUrl
        // }
        store.dispatch({ type: SET_LOGGEDIN_USER, user: userToSave })
        return userToSave
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err

    }
}

export async function saveUserImg(user) {
    try {
        const userToSave = await userService.updateImg(user)
        store.dispatch({ type: SET_USER, user })
        store.dispatch({ type: SET_LOGGEDIN_USER_IMG, imgUrl: userToSave.imgUrl })
        return userToSave
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err
    }
}

// export async function saveUserImg(user,ev) {
//     try {
//         store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//         const media = await utilService.uploadImgToCloudinary(ev)
//         const userToSave = await userService.updateImg({ ...user, imgUrl: media.url })
//         store.dispatch({ type: SET_USER, userToSave })
//         store.dispatch({ type: SET_LOGGEDIN_USER_IMG, imgUrl: userToSave.imgUrl })
//         return userToSave
//     } catch (err) {
//         console.log('user action -> Cannot save user', err)
//         throw err
//     } finally {
//         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//     }

// }

// from profile after we have currUser
export async function addFollowing(miniUser, loggedinUser, from) {
    try {
        const addedUser = await userService.addFollowing(miniUser)
        // if from === fromHome (nav side) i dont want to update the store 
        if (!from) store.dispatch({ type: ADD_FOLLOWING, loggedinUser })
        return addedUser
    } catch (err) {
        console.log('user action -> Cannot add following user', err)
        throw err
    }
}

export async function removeFollowing(userId, loggedinUserId, from) {
    try {
        const removedUserId = await userService.removeFollowing(userId)
        if (!from) store.dispatch({ type: REMOVE_FOLLOWING, loggedinUserId })
        return removedUserId
    } catch (err) {
        console.log('user action -> Cannot add following user', err)
        throw err

    }
}

export async function updateNotificationSeen(userId) {
    try {
        const userToSave = await userService.updateNotificationSeen(userId)
        store.dispatch({ type: UPDATE_USER_NOTIFICATIONS })
        return userToSave
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err

    }
}

export async function updateUsersMsgId(miniUserToChat) {
    console.log('updateUsersMsgId')
    try {
        // update the DB
        const msgInfo = await msgService.save(miniUserToChat)
        const user1Id = msgInfo.users[0]._id
        const user2Id = msgInfo.users[1]._id
       // update the store 
        // store.dispatch({ type: UPDATE_USER_MSG_ID ,userId:user1Id ,msgId:msgInfo._id})
        // store.dispatch({ type: UPDATE_USER_MSG_ID ,userId:user2Id ,msgId:msgInfo._id})
        return msgInfo
    } catch (err) {
        console.log('user action -> Cannot save user msg id', err)
        throw err

    }
}
