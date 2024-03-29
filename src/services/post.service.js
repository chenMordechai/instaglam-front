
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'post/'
// const STORAGE_KEY = 'postDB'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    getFilters,
    addLikePost,
    removeLikePost,
    getEmptyComment,
    addComment,
    removeComment,
    addLikeComment,
    removeLikeComment
    // getDefaultFilter,
    // getLabels,
    // getDefaultSort,
    // getCategories,
    // getCategoriesIcons,
    // saveMsg,
    // removeMsg,
    // getEmptyMsg,
}

async function query(filterBy = {}, sortBy = {}) {
    // filterBy = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterBy) // params => query
}

// async function queryOLD(filterBy = {}, sortBy = {}) {
//     filterBy = { ...filterBy, ...sortBy }
//     const posts = await httpService.get(BASE_URL, filterBy)
//     //     const postsData ={
//     //         allPostsCount : posts.length,
//     //         donePostsCount : posts.filter(t=>t.isDone).length,
//     //         postsToDisplay:[],
//     //         pageCount:0
//     //     }
//     // let postsToDisplay = posts.slice()
//     // if (filterBy.name) {
//     //     const regExp = new RegExp(filterBy.name, 'i')
//     //     postsToDisplay = postsToDisplay.filter(t => regExp.test(t.name))
//     // }

//     // if (filterBy.price) {
//     //     postsToDisplay = postsToDisplay.filter(t => t.price <= filterBy.price)
//     // }

//     // if (filterBy.inStock !== 'all') {
//     //     postsToDisplay = postsToDisplay.filter(t => t.inStock && filterBy.inStock === 'inStock'
//     //     || !t.inStock && filterBy.inStock === 'notInStock')
//     // }

//     // if(filterBy.labels.length !== 0){
//     //     postsToDisplay = postsToDisplay.filter(t => {
//     //         return filterBy.labels.every(l =>{
//     //            return t.labels.includes(l)
//     //         })
//     //     })
//     // }

//     // if (sortBy.type) {
//     //     if(sortBy.type === 'name'){
//     //         postsToDisplay.sort(((t1, t2) => t1.name.localeCompare(t2.name) * sortBy.desc))
//     //     }else{
//     //         console.log('sortBy.type',sortBy.type)
//     //         postsToDisplay.sort(((t1, t2) => (t1[sortBy.type] - t2[sortBy.type]) * sortBy.desc))
//     //     }
//     // } 
//     //     const pageCount = Math.ceil(postsToDisplay.length / PAGE_SIZE)
//     //     if (filterBy.pageIdx !== undefined) {
//     //         let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
//     //         postsToDisplay = postsToDisplay.slice(start, start + PAGE_SIZE)
//     //     }
//     //     postsData.pageCount = pageCount
//     //     postsData.postsToDisplay = postsToDisplay
//     // return postsToDisplay
//     return posts
// }

async function getById(postId) {
    return httpService.get(BASE_URL + postId) // params
}

async function remove(postId) {
    return httpService.delete(BASE_URL + postId) // params
}

async function save(post) {
    if (post._id) {
        return httpService.put(BASE_URL + post._id, post) // params + body
    } else {
        return httpService.post(BASE_URL, post)
    }
}

async function addLikePost(postId) {
    return httpService.post(BASE_URL + postId + '/like')
}

async function removeLikePost(postId, likeById) {
    return httpService.delete(BASE_URL + postId + '/like/' + likeById)
}

async function addComment(comment, postId) {
    return httpService.post(BASE_URL + postId + '/comment', comment)
}

async function removeComment(commentId, postId) {
    return httpService.delete(BASE_URL + postId + '/comment/' + commentId)
}

async function addLikeComment(postId, comment) {
    return httpService.post(BASE_URL + postId + '/comment/like/' + comment._id, comment)
}

async function removeLikeComment(postId, commentId, likeById) {
    return httpService.delete(BASE_URL + postId + '/comment/like/' + commentId + '/' + likeById)
}

function getEmptyPost() {
    return {
        txt: '',
        type: '',
        url: '',
        createdAt: '',
        by: null,
        loc: null,
        comments: [],
        likedBy: [],
        tags: []
    }
}

function getFilters() {
    return [{ name: 'none', prop: 'none' }, { name: 'saturate', prop: 'saturate(2)' }, { name: 'grayscale', prop: 'grayscale(1)' }, { name: 'hue-rotate', prop: 'hue-rotate(115deg)' }, { name: 'invert', prop: 'invert(1)' }, { name: 'blur', prop: 'blur(1px)' }, { name: 'brightness', prop: 'brightness(0.5)' }, { name: 'contrast', prop: 'contrast(0.5)' }, { name: 'opacity', prop: 'opacity(0.5)' }, { name: 'sepia', prop: 'sepia(1)' }]
}

function getEmptyComment() {
    return {
        txt: '',
        createdAt: '',
        by: '',
        likedBy: []
    }
}

// function getDefaultFilter() {
//     return { name: '', inStock: 'all', labels: [], price: '' }
// }

// function getDefaultSort() {
//     return { type: '', desc: 1 }
// }

// function getLabels() {
//     return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//         'Outdoor', 'Battery Powered']
// }

// function getCategories() {
//     return ['All', 'In Stock', ...getLabels()]
// }

// function getCategoriesIcons() {
//     return ['faPersonBiking', 'faCubesStacked', 'faPuzzlePiece', 'faBorderAll']
// }



