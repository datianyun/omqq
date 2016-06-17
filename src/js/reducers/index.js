import { combineReducers } from 'redux'
import {postsByMedia,selectedMedia} from './mail'
import {mails,medias,getConfig,time,alerts,analysis} from './config'

const rootReducer = combineReducers({
    mails,
    medias,
    time,
    alerts,
    analysis,
    getConfig,
    postsByMedia,
    selectedMedia
})

export default rootReducer
