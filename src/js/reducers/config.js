import { ADD_MAIL, DELETE_MAIL, ADD_MEDIA, DELETE_MEDIA, GET_CONFIG,ADD_CONFIG,ADD_TIME} from '../constants/ActionTypes'

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
            if(action.posts.Fbd_email_list !==""){
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
export function getConfig(state = initConfig, action) {
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
export function time(state = {
    startDate : undefined,
    endDate: undefined
},action) {
    switch (action.type) {
        case ADD_TIME:
            let tar = {}
            tar.startDate = action.time.startDate
            tar.endDate = action.time.endDate
            return tar
        case ADD_CONFIG:
            let obj = {}
            obj.startDate = action.posts.Fbd_email_starttime
            obj.endDate = action.posts.Fbd_email_endtime
            return obj
        default:
            return state
    }
}
export function medias(state = initialState, action) {
    switch (action.type) {
        case ADD_MEDIA:
            let item = Object.assign({},action.posts[0],{
                mid: state.reduce((maxId, media) => Math.max(media.mid, maxId), -1) + 1
            })
            return [
                item,
                ...state
            ]
        case ADD_CONFIG:
            let mediaList = []
            action.posts.children_data.forEach(function(item){
                let obj = Object.assign({},item,{
                    mid: state.reduce((maxId, media) => Math.max(media.mid, maxId), -1) + 1
                })
                mediaList.push(obj)
            })
            return mediaList
        case DELETE_MEDIA:
            return state.filter(media =>
            media.mid !== action.id
        )

        default:
            return state
        }
}
