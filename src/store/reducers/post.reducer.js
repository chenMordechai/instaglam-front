

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_LIKED_BY = 'UPDATE_POST_LIKED_BY'
export const REMOVE_POST_LIKED_BY = 'REMOVE_POST_LIKED_BY'
export const UPDATE_POST_COMMENT = 'UPDATE_POST_COMMENT'
export const REMOVE_POST_COMMENT = 'REMOVE_POST_COMMENT'
export const UPDATE_COMMENT_LIKED_BY = 'UPDATE_COMMENT_LIKED_BY'
export const REMOVE_COMMENT_LIKED_BY = 'REMOVE_COMMENT_LIKED_BY'
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

        case UPDATE_POSTS:
            posts = state.posts.map(post => post._id === action.post._id ? action.post : post)
            return { ...state, posts }

        case UPDATE_POST_LIKED_BY:
            posts = state.posts.map(post => {
                if (post._id === action.postId) {
                    post.likedBy = [...post.likedBy, action.likedBy]
                }
                return post
            })
            return { ...state, posts }

        case REMOVE_POST_LIKED_BY:
            posts = state.posts.map(post => {
                if (post._id === action.postId) {
                    post.likedBy = post.likedBy.filter(lb => lb._id !== action.likeById)
                }
                return post
            })
            return { ...state, posts }

            case UPDATE_POST_COMMENT:
                posts = state.posts.map(post => {
                    if (post._id === action.postId) {
                        post.comments = [...post.comments, action.comment]
                    }
                    return post
                })
                return { ...state, posts }

                case REMOVE_POST_COMMENT:
                    posts = state.posts.map(post => {
                        if (post._id === action.postId) {
                            post.comments = post.comments.filter(c => c._id !== action.commentId)
                        }
                        return post
                    })
                    return { ...state, posts }

                    case UPDATE_COMMENT_LIKED_BY:
                        posts = state.posts.map(post => {
                            if (post._id === action.postId) {
                                post.comments = post.comments.map(comment=>{
                                    if(comment._id === action.commentId){
                                        comment.likedBy = [...comment.likedBy, action.likedBy]
                                    }
                                    return comment
                                })
                            }
                            return post
                        })
                        return { ...state, posts }
            
                    case REMOVE_COMMENT_LIKED_BY:
                        posts = state.posts.map(post => {
                            if (post._id === action.postId) {
                                post.comments = post.comments.map(comment=>{
                                    if(comment._id === action.commentId){
                                        comment.likedBy = comment.likedBy.filter(lb => lb._id !== action.likeById)
                                    }
                                    return comment
                                })
                            }
                            return post
                        })
                        return { ...state, posts }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state;
    }
}