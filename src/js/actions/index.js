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
export function selectMail(mail) {
  return {
    type: SELECT_MAIL,
    mail
  }
}

export function invalidateMail(mail) {
  return {
    type: INVALIDATE_MAIL,
    mail
  }
}

function requestPosts(mail) {
  return {
    type: types.REQUEST_POSTS,
    mail
  }
}

function receivePosts(mail, json) {
  return {
    type: types.RECEIVE_POSTS,
    mail,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(mail) {
  return dispatch => {
    dispatch(requestPosts(mail))
    return fetch(`https://www.reddit.com/r/${mail}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(mail, json)))
  }
}

function shouldFetchPosts(state, mail) {
  const posts = state.postsByMail[mail]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(mail) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), mail)) {
      return dispatch(fetchPosts(mail))
    }
  }
}
