import { combineReducers } from 'redux'
import {postsByMedia,selectedMedia} from './mail'
import {mails,medias,getConfig,time,alerts} from './config'

const rootReducer = combineReducers({
    mails,
    medias,
    time,
    alerts,
    getConfig,
    postsByMedia,
    selectedMedia
})

export default rootReducer
