
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'storyDB'
const PAGE_SIZE = 3

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    getDefaultFilter,
    getLabels,
    getDefaultSort
}


async function query(filterBy = {}, sortBy = {}) {
    // console.log('filterBy:', filterBy)
    // console.log('sortBy:', sortBy)

    const stories = await storageService.query(STORAGE_KEY)

    //     const storiesData ={
    //         allStoriesCount : stories.length,
    //         doneStoriesCount : stories.filter(t=>t.isDone).length,
    //         storiesToDisplay:[],
    //         pageCount:0
    //     }
    let storiesToDisplay = stories.slice()
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        storiesToDisplay = storiesToDisplay.filter(t => regExp.test(t.name))
    }

    if (filterBy.price) {
        storiesToDisplay = storiesToDisplay.filter(t => t.price <= filterBy.price)
    }

    if (filterBy.inStock !== 'all') {
        storiesToDisplay = storiesToDisplay.filter(t => t.inStock && filterBy.inStock === 'inStock'
            || !t.inStock && filterBy.inStock === 'notInStock')
    }

    if (filterBy.labels.length !== 0) {
        storiesToDisplay = storiesToDisplay.filter(t => {
            return filterBy.labels.every(l => {
                return t.labels.includes(l)
            })
        })
    }

    if (sortBy.type) {
        if (sortBy.type === 'name') {
            storiesToDisplay.sort(((t1, t2) => t1.name.localeCompare(t2.name) * sortBy.desc))
        } else {
            storiesToDisplay.sort(((t1, t2) => (t1[sortBy.type] - t2[sortBy.type]) * sortBy.desc))
        }
    }
    //     const pageCount = Math.ceil(storiesToDisplay.length / PAGE_SIZE)
    //     if (filterBy.pageIdx !== undefined) {
    //         let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
    //         storiesToDisplay = storiesToDisplay.slice(start, start + PAGE_SIZE)
    //     }
    //     storiesData.pageCount = pageCount
    //     storiesData.storiesToDisplay = storiesToDisplay
    return storiesToDisplay
}
function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}
function remove(storyId) {
    return storageService.remove(STORAGE_KEY, storyId)

}
async function save(story) {
    if (story._id) {
        const savedStory = await storageService.put(STORAGE_KEY, story)
        return savedStory
    } else {
        const savedStory = await storageService.post(STORAGE_KEY, story)
        return savedStory
    }
}

function getEmptyStory() {
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

const story = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}
