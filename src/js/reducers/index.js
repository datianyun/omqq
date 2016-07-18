import { combineReducers } from 'redux'
import {postsByMedia,selectedMedia,selectedArticle} from './mail'
import {mails,medias,getConfig,time,alerts,analysis,statics,articles,articleData} from './config'

const rootReducer = combineReducers({
    mails,
    medias,
    time,
    alerts,
    analysis,
    articleData,
    statics,
    articles,
    getConfig,
    postsByMedia,
    selectedArticle,
    selectedMedia
})

export default rootReducer
