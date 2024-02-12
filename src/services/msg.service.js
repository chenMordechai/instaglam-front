import { httpService } from './http.service.js'

const BASE_URL = 'msg/'

export const msgService = {
    getById,
    save,

}

async function getById(msgId) {
    return httpService.get(BASE_URL + msgId)
}

async function save(post) {
    return httpService.post(BASE_URL, post)
}
