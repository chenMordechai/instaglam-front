
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const BASE_URL_USER = 'user/'
const BASE_URL_AUTH = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    query,
    getById,
    remove,
    update,
    updateImg,
    login,
    logout,
    signup,
    getLoggedinUser,
    // changeScore,
    getEmptyCredentials,
    addFollowing,
    removeFollowing,
    updateNotificationSeen
}


async function query() {
    return httpService.get(BASE_URL_USER)
}

async function getById(userId) {
    const user = await httpService.get(BASE_URL_USER + userId)
    return user
}

async function remove(userId) {
    return httpService.delete(BASE_URL_USER + userId)
}

async function update(user) {
    user = await httpService.put(BASE_URL_USER + user._Id, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _setLoggedinUser({ ...getLoggedinUser(), ...user })
    return user
}

async function updateImg(user) {
    user = await httpService.put(BASE_URL_USER + user._Id + '/img', user)
    // Handle case in which admin updates other user's details
    // console.log('update img user service!!:', {...getLoggedinUser(),...user})
    if (getLoggedinUser()._id === user._id) _setLoggedinUser({ ...getLoggedinUser(), ...user })
    // if (getLoggedinUser()._id === user._id) _setLoggedinUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post(BASE_URL_AUTH + 'login', userCred)
    console.log('user loginnnnnnnnn:', user)
    if (user) {
        _setLoggedinUser(user)
        return user
    }
}

async function signup({ username, password, fullname, email }) {
    const userToSave = {
        username,
        password,
        fullname,
        email
    }
    // console.log('userToSave:', userToSave)
    const user = await httpService.post(BASE_URL_AUTH + 'signup', userToSave)
    _setLoggedinUser(user)
    return user

}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post(BASE_URL_AUTH + 'logout')

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const { _id, fullname, username, imgUrl } = user
    const userToSave = { _id, fullname, username, imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

async function addFollowing(miniUser) {
    return httpService.post(BASE_URL_USER + miniUser._id + '/following', miniUser)
}

async function removeFollowing(miniUserId) {
    return httpService.delete(BASE_URL_USER + miniUserId + '/following')
}

async function updateNotificationSeen(userId) {
    return await httpService.put(BASE_URL_USER + userId + '/notification')
}

function getEmptyCredentials() {
    return {
        username: 'chen_mordechai1',
        password: '123',
        fullname: '',
        email: ''
    }
}

