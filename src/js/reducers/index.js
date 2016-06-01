import { combineReducers } from 'redux'
import {postsByMedia,selectedMedia} from './mail'
import {mails,medias,getConfig,time} from './config'

const rootReducer = combineReducers({
    mails,
    medias,
    time,
    getConfig,
    postsByMedia,
    selectedMedia
})

export default rootReducer
