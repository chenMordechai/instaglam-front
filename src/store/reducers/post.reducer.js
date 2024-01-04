

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    posts: [],
    // currPost: null,
    // filterBy: postService.getDefaultFilter(),
    // sortBy: postService.getDefaultSort(),
    isLoading: false,
}

export function postReducer(state = initialState, action = {}) {
    let posts
    switch (action.type) {
        case SET_POSTS:
            return { ...state, posts: action.posts }

        // case SET_POST:
        //     return { ...state, currPost: action.post }

        case REMOVE_POST:
            posts = state.posts.filter(post => post._id !== action.postId)
            return { ...state, posts }

        case ADD_POST:
            posts = [...state.posts, action.post]
            return { ...state, posts }

        case UPDATE_POST:
            posts = state.posts.map(post => post._id === action.post._id ? action.post : post)
            return { ...state, posts }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state;
    }
}