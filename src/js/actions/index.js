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
    console.log('receivePosts')
    if(media.type==="search"){
        console.log('search')
        return {
            type: types.RECEIVE_POSTS,
            media,
            posts: json.data.list,
            total: json.data.count,
            receivedAt: Date.now()
        }
    } else if(media.type==="add") {
        console.log('add')
        return {
            type: types.ADD_MEDIA,
            media,
            posts: json.data.list,
            total: json.data.count,
            receivedAt: Date.now()
        }
    } else{
        return {
            type: types.ADD_CONFIG,
            media,
            posts: json.data,
            receivedAt: Date.now()
        }
    }
}

function fetchPosts(media) {
    const params='?keyword=' + media.key + '&page=' + media.currentPage + '&size=' + media.perNum
    return dispatch => {
        dispatch(requestPosts(media))
            return fetch(media.path+params)
                .then(response => response.json())
                .then(json => dispatch(receivePosts(media, json)))
      }
}

function shouldFetchPosts(state, media) {
    const pkey = media.currentPage + '-' + media.key
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

export function deleteMedia(id) {
    return { type: types.DELETE_MEDIA, id }
}

export function fetchConfig(config){
    const params = '?media_id=' + config.mid
    return dispatch => {
        dispatch(requestPosts(config))
            return fetch(config.path+params)
                .then(response => response.json())
                .then(json => dispatch(receivePosts(config, json)))
      }
}
