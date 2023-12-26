import { combineReducers, compose, legacy_createStore as createStore } from "redux"
// import { userService } from "../services/user.service.js"
import { userReducer } from "./reducers/user.reducer.js"
import { postReducer } from "./reducers/post.reducer.js"
import { msgReducer } from "./reducers/msg.reducer.js"
import { storyReducer } from "./reducers/story.reducer.js"



const rootReducer = combineReducers({
    userModule: userReducer,
    postModule: postReducer,
    storyModule: storyReducer,
    msgModule: msgReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())



// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

