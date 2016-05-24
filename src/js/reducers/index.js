import { combineReducers } from 'redux'
import todos from './todos'
import {postsByMail,selectedMedia} from './mail'

const rootReducer = combineReducers({
  todos,
  postsByMail,
  selectedMedia
})

export default rootReducer
