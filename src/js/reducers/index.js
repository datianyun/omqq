import { combineReducers } from 'redux'
import {postsByMedia,selectedMedia,selectedArticle} from './mail'
import {mails,medias,getConfig,time,alerts,analysis,statics,articles,articleData,menus} from './config'

const rootReducer = combineReducers({
    mails,
    medias,
    time,
    alerts,
    analysis,
    articleData,
    statics,
    articles,
    menus,
    getConfig,
    postsByMedia,
    selectedArticle,
    selectedMedia
})

export default rootReducer
