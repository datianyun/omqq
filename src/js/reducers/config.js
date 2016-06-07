import { ADD_MAIL, DELETE_MAIL, ADD_MEDIA, DELETE_MEDIA, GET_CONFIG,ADD_CONFIG,ADD_TIME, ADD_ALERT,DELETE_ALERT} from '../constants/ActionTypes'
import {addAlert} from '../actions/index'
import moment from 'moment'
const initialState = []
const initConfig = {}
export  function mails(state = initialState, action) {
    switch (action.type) {
        case ADD_MAIL:
            return [
                {
                    id: state.reduce((maxId, mail) => Math.max(mail.id, maxId), -1) + 1,
                    text: action.text
                },
                ...state
            ]
        case ADD_CONFIG:
            let emails = []
            let mailList = []
            if(action.posts.Fbd_email_list !=="" && action.posts.Fbd_email_list !==null){
                emails = action.posts.Fbd_email_list.split(",")
                emails.forEach(function(item){
                    mailList.push({
                        id: mailList.reduce((maxId, mail) => Math.max(mail.id, maxId), -1) + 1,
                        text: item
                    })
                })
            }
            return mailList
        case DELETE_MAIL:
            return state.filter(mail =>
                mail.id !== action.id
            )
        default:
            return state
    }
}
export function getConfig(state = {
    Fname:''
}, action) {
    switch (action.type) {
        case GET_CONFIG:
            return action.media
        case ADD_CONFIG:
            state.Fname = action.posts.Fname
            return state
        default:
            return state
    }
}
export function alerts(state={
    info:null
}, action) {
    switch (action.type) {
        case ADD_MEDIA:
            if(action.posts.length === 0) {
                return Object.assign({}, action.alerts, {
                    info: '不合法的邮箱'
                })
            }
            let fmedia = action.posts[0]
            if(fmedia.Fbd_mail_config != 1){
                return Object.assign({}, action.alerts, {
                    info: fmedia.Fmail_config_flag
                })
            }
            return state
        case DELETE_ALERT:
            return Object.assign({}, action.alerts, {
                info: null
            })
        default:
            return state
    }
}

export function time(state = {
    startDate : undefined,
    endDate: undefined,
    type: undefined
},action) {
    switch (action.type) {
        case ADD_TIME:
            let tar = {}
            tar.startDate = action.time.startDate
            tar.endDate = action.time.endDate
            return tar
        case ADD_CONFIG:
            let obj = {}
            if(action.posts.Fbd_email_starttime==null){
                obj.startDate = moment().format('YYYY-MM-DD')
                obj.endDate = moment().add(3, 'months').format('YYYY-MM-DD')
                obj.type = 'var'
            } else {
                obj.startDate = action.posts.Fbd_email_starttime
                obj.endDate = action.posts.Fbd_email_endtime
                obj.type = 'const'
            }
            return obj
        default:
            return state
    }
}
export function medias(state = initialState, action) {
    switch (action.type) {
        case ADD_MEDIA:
            if(action.posts.length === 0) {
                return state
            }
            let fmedia = action.posts[0]
            if(fmedia.Fbd_mail_config == '1'){
                let item = Object.assign({},fmedia,{
                    mid: state.reduce((maxId, media) => Math.max(media.mid, maxId), -1) + 1,
                    mtype: 'unsave'
                })
                return [
                    item,
                    ...state
                ]
            } else {
                return state
            }
        case ADD_CONFIG:
            let mediaList = []
            action.posts.children_data.forEach(function(item){
                let obj = Object.assign({},item,{
                    mid: mediaList.reduce((maxId, media) => Math.max(media.mid, maxId), -1) + 1
                })
                mediaList.push(obj)
            })
            return mediaList
        case DELETE_MEDIA:
            return state.filter(media =>
                media.mid !== action.media.id
            )

        default:
            return state
        }
}
