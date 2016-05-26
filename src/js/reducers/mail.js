import {SELECT_MEDIA, INVALIDATE_MAIL,REQUEST_POSTS, RECEIVE_POSTS} from '../constants/ActionTypes'

const initialState = {
    key:'reactjs',
    currentPage:1,
    perNum:5
}

export function selectedMedia(state =initialState, action) {
    switch (action.type) {
        case SELECT_MEDIA:
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
      const pkey = action.media.currentPage + '-' + action.media.key
      return Object.assign({}, state, {
        [pkey]: posts(state[action.media], action)
      })
    default:
      return state
  }
}
