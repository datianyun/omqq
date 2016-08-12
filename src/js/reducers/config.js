import { ADD_MAIL, DELETE_MAIL, ADD_MEDIA, DELETE_MEDIA, GET_CONFIG,ADD_CONFIG,ADD_TIME, ADD_ALERT,DELETE_ALERT,ADD_ANALYSIS,ADD_STATICS,REFRESH_STATICS,ADD_ARTICLE} from '../constants/ActionTypes'
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
        case ADD_ALERT:
            return Object.assign({}, action.alerts, {
                info: action.alerts.msg
            })
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
export function analysis(state = {
    status:[],
    catalog:[],
    quyuCata:[],
    bdsite:[]
}, action) {
    switch (action.type) {
        case ADD_ANALYSIS:
            return {
                status: action.status,
                catalog:action.catalog,
                quyuCata:action.quyuCata,
                bdsite:action.bdsite
            }
        default:
            return state
    }
}
export function statics(state = {
    posts:[],
    total:0
}, action) {
    switch (action.type) {
        case ADD_STATICS:
            return {
                posts:action.posts,
                total:action.total
            }
        case REFRESH_STATICS:
            return {
                total:action.total,
                posts:action.posts
            }
        default:
            return state
    }
}

export function articles(state = {
    total:0,
    posts:[]
}, action) {
    switch (action.type) {
        case ADD_STATICS:
            return {
                total:action.count,
                posts:action.articles
            }
        case ADD_ARTICLE:
            return {
                total:action.count,
                posts:action.articles
            }
        default:
            return state
    }
}
export function articleData(state = {
    read:0,
    recommend:0,
    fans:0
}, action) {
    switch (action.type) {
        case ADD_STATICS:
            return {
                read:action.read,
                recommend:action.recommend,
                fans:action.fans
            }
        default:
            return state
    }
}
export function menus(state = [], action) {
    state=[]
    let isAdmin = g_userInfo.admin ==='1' ? true : false
    let isQuyu = g_userInfo.bdsitecatalog.indexOf(g_userInfo.site) === -1 ? false: true
    let menuTar = {
        id: 1,
        name:'政企专区',
        classValue:'',
        list:[{
            name:'邮件功能',
            classValue:'',
            url:'/media/mailList'
        }]
    }
    let menuObj = {
        id: 2,
        name:'媒体运营',
        classValue:'',
        list:[{
            name:'媒体认领',
            classValue:'',
            url:'/media/mediaBdConfig'
        },
        {
            name:'媒体管理',
            classValue:'',
            url:'/media/mediaBdManage'
        }]
    }
    if(isQuyu){
        menuObj.list.push({
            name:'按行业查看全部',
            classValue:'',
            url:'/media/mediaBdCataLog'
        })
    }

    let url = window.location.pathname
    switch(url){
        case '/media/mailList':
        case '/media/mailConfig':
            menuTar.classValue='active'
            menuTar.list[0].classValue='active'
            break;
        case '/media/mediaBdConfig':
            menuObj.classValue='active'
            menuObj.list[0].classValue='active'
            break
        case '/media/mediaBdManage':
            menuObj.classValue='active'
            menuObj.list[1].classValue='active'
            break
        case '/media/statisticsManage':
            menuObj.classValue='active'
            menuObj.list[1].classValue='active'
            break
        case '/media/mediaBdCataLog':
            menuObj.classValue='active'
            menuObj.list[2].classValue='active'
            break
    }
    if(isAdmin) {
        state.push(menuTar)
    }
    state.push(menuObj)
    return state
}
