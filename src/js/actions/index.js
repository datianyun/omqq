import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function selectMedia(media) {
    return {
        type: types.SELECT_MEDIA,
        media
    }
}

export function invalidateMail(media) {
    return {
        type: types.INVALIDATE_MAIL,
        media:meidia
    }
}

function requestPosts(media) {
    return {
        type: types.REQUEST_POSTS,
        media
    }
}

function receivePosts(media, json) {
    if(media.type==="search"){
        return {
            type: types.RECEIVE_POSTS,
            media,
            posts: json.data.list,
            total: json.data.count,
            receivedAt: Date.now()
        }
    } else if(media.type==="add") {
        return {
            type: types.ADD_MEDIA,
            media,
            posts: json.data.list,
            total: json.data.count,
            receivedAt: Date.now()
        }
    } else if(media.type==="analysis"){
        return {
            type: types.ADD_ANALYSIS,
            media,
            status: json.data.media_status,
            catalog: json.data.catalog_map,
            posts: json.data.list,
            total: json.data.count,
            receivedAt: Date.now()
        }
    } else {
        return {
            type: types.ADD_CONFIG,
            media,
            posts: json.data,
            receivedAt: Date.now()
        }
    }
}

export function fetchPosts(media) {
    let params='?keyword=' + media.key + '&page=' + media.currentPage + '&size=' + media.perNum
    if(media.search!==undefined){
        params += media.search
    }
    return dispatch => {
        dispatch(requestPosts(media))
            return fetch(media.path+params,{
               credentials: 'same-origin'
            }).then(response => response.json())
            .then(json => dispatch(receivePosts(media, json)))
    }
}

function shouldFetchPosts(state, media) {
    let pkey = media.currentPage + '-' + media.key
    if(media.search !== undefined){
        pkey = media.currentPage + '-' +media.search + '-' +media.key
    }
    const posts = state.postsByMedia[pkey]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export function fetchPostsIfNeeded(media) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), media)) {
            return dispatch(fetchPosts(media))
        }
    }
}
export function fetchMediaIfNeeded(media){
    return (dispatch, getState) => {
        return dispatch(fetchPosts(media))
    }
}

export function addMail(text) {
    return { type: types.ADD_MAIL, text }
}
export function addTime(time) {
    return {
        type: types.ADD_TIME,
        time
    }
}

export function deleteMail(id) {
    return { type: types.DELETE_MAIL, id }
}

export function addMedia(media) {
    return { type: types.ADD_MEDIA, media }
}

export function deleteMedia(media) {
    return { type: types.DELETE_MEDIA, media }
}

export function fetchConfig(config){
    const params = '?media_id=' + config.mid
    return dispatch => {
        dispatch(requestPosts(config))
            return fetch(config.path+params,{
               credentials: 'same-origin'
            }).then(response => response.json())
            .then(json => dispatch(receivePosts(config, json)))
      }
}
export function addAlert(text){
    return { type: types.ADD_ALERT, text}
}

export function deleteAlert(){
    return { type: types.DELETE_ALERT}
}
