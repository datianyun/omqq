import {SELECT_MEDIA, INVALIDATE_MAIL,REQUEST_POSTS, RECEIVE_POSTS, DELETE_MEDIA, ADD_MEDIA,ADD_ANALYSIS,ADD_STATICS,SELECT_ARTICLE,ADD_ARTICLE,REFRESH_STATICS,DELETE_MANAGER} from '../constants/ActionTypes'

const initialState = {
    key:'',
    path:'/media/mailListData',
    currentPage:1,
    type: 'search',
    perNum:10
}

export function selectedMedia(state =initialState, action) {
    switch (action.type) {
        case SELECT_MEDIA:
            return action.media
        case DELETE_MANAGER:
            //增加到筛选条件中，当页面删除时，条件改变触发请求
            return Object.assign({}, state, {
                refresh:true
            })
        default:
            return state
    }
}

export function selectedArticle(state ={
    key:'',
    path:'/media/mediaArticleStatistic',
    currentPage:1,
    type: 'article',
    perNum:10
}, action) {
    switch (action.type) {
        case SELECT_ARTICLE:
            return action.media
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_MAIL:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                total: action.total,
                catalog:action.catalog?action.catalog:[],
                lastUpdated: action.receivedAt
            })
        case ADD_ANALYSIS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                total: action.total,
                lastUpdated: action.receivedAt
            })
        case ADD_STATICS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                total: action.total,
                count: action.count,
                articles: action.articles,
                lastUpdated: action.receivedAt
            })
        case REFRESH_STATICS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.articles,
                lastUpdated: action.receivedAt
             })

    default:
      return state
  }
}

export function postsByMedia(state = {}, action) {
  switch (action.type) {
      case INVALIDATE_MAIL:
      case RECEIVE_POSTS:
      case REQUEST_POSTS:
          let pkey = action.media.currentPage + '-' + action.media.key
          if(action.media.search !== undefined){
              pkey = action.media.currentPage + '-' +action.media.search + '-' +action.media.key + '-' + action.media.path
          }
          return Object.assign({}, state, {
             [pkey]: posts(state[action.media], action)
          })
          break
      case ADD_ANALYSIS:
      case ADD_STATICS:
      case REFRESH_STATICS:
      case ADD_ARTICLE:
          let akey = action.media.currentPage + '-' +action.media.search + '-' +action.media.key + '-' + action.media.path
          return Object.assign({}, state, {
             [akey]: posts(state[action.media], action)
          })
          break
      case DELETE_MANAGER:
          delete state[action.id]
      default:
          return state
  }
}
