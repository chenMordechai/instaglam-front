import { httpService } from './http.service.js'

const BASE_URL = 'msg/'

export const msgService = {
    query,
    getById,
    save,

}

async function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

async function getById(msgId) {
    return httpService.get(BASE_URL + msgId)
}

async function save(userToChat) {
    return httpService.post(BASE_URL, userToChat)
}
