import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function addTodo(text) {
  return { type: types.ADD_TODO, text }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}

export function showUser() {
  return { type: types.CLEAR_COMPLETED }
}

export function hideUser() {
  return { type: types.CLEAR_COMPLETED }
}
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
  return {
    type: types.RECEIVE_POSTS,
    media,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(media) {
    const params='?wd=' + media.key + '&page=' + media.currentPage + '&limit=' + media.perNum
    return dispatch => {
        dispatch(requestPosts(media))
            return fetch(`https://www.reddit.com/r/${media.key}.json`+params)
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
