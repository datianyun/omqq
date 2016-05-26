import { combineReducers } from 'redux'
import todos from './todos'
import {postsByMedia,selectedMedia} from './mail'
import {mails,medias} from './config'

const rootReducer = combineReducers({
    todos,
    mails,
    medias,
    postsByMedia,
    selectedMedia
})

export default rootReducer
