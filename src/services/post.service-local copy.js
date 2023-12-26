
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'postDB'
const PAGE_SIZE = 3

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    getDefaultFilter,
    getLabels,
    getDefaultSort
}


async function query(filterBy = {}, sortBy = {}) {
    // console.log('filterBy:', filterBy)
    // console.log('sortBy:', sortBy)

    const posts = await storageService.query(STORAGE_KEY)

    //     const postsData ={
    //         allPostsCount : posts.length,
    //         donePostsCount : posts.filter(t=>t.isDone).length,
    //         postsToDisplay:[],
    //         pageCount:0
    //     }
    let postsToDisplay = posts.slice()
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        postsToDisplay = postsToDisplay.filter(t => regExp.test(t.name))
    }

    if (filterBy.price) {
        postsToDisplay = postsToDisplay.filter(t => t.price <= filterBy.price)
    }

    if (filterBy.inStock !== 'all') {
        postsToDisplay = postsToDisplay.filter(t => t.inStock && filterBy.inStock === 'inStock'
            || !t.inStock && filterBy.inStock === 'notInStock')
    }

    if (filterBy.labels.length !== 0) {
        postsToDisplay = postsToDisplay.filter(t => {
            return filterBy.labels.every(l => {
                return t.labels.includes(l)
            })
        })
    }

    if (sortBy.type) {
        if (sortBy.type === 'name') {
            postsToDisplay.sort(((t1, t2) => t1.name.localeCompare(t2.name) * sortBy.desc))
        } else {
            postsToDisplay.sort(((t1, t2) => (t1[sortBy.type] - t2[sortBy.type]) * sortBy.desc))
        }
    }
    //     const pageCount = Math.ceil(postsToDisplay.length / PAGE_SIZE)
    //     if (filterBy.pageIdx !== undefined) {
    //         let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
    //         postsToDisplay = postsToDisplay.slice(start, start + PAGE_SIZE)
    //     }
    //     postsData.pageCount = pageCount
    //     postsData.postsToDisplay = postsToDisplay
    return postsToDisplay
}
function getById(postId) {
    return storageService.get(STORAGE_KEY, postId)
}
function remove(postId) {
    return storageService.remove(STORAGE_KEY, postId)

}
async function save(post) {
    if (post._id) {
        const savedPost = await storageService.put(STORAGE_KEY, post)
        return savedPost
    } else {
        const savedPost = await storageService.post(STORAGE_KEY, post)
        return savedPost
    }
}

function getEmptyPost() {
    return {
        name: '',
        inStock: true,
        price: 0,
        labels: []

    }
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], price: '' }
}
function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}

const post = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}
