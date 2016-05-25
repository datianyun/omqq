import { combineReducers } from 'redux'
import todos from './todos'
import {postsByMedia,selectedMedia} from './mail'

const rootReducer = combineReducers({
  todos,
  postsByMedia,
  selectedMedia
})

export default rootReducer
