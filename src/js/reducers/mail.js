import {
  SELECT_MAIL, INVALIDATE_MAIL,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/ActionTypes'

export function selectedMedia(state = {
    key:'reactjs',
    currentPage:1,
    perNum:5
}, action) {
  switch (action.type) {
    case SELECT_MAIL:
      return action.mail
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
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function postsByMail(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_MAIL:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.media]: posts(state[action.media], action)
      })
    default:
      return state
  }
}
