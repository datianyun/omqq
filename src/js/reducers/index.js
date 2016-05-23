import { combineReducers } from 'redux'
import todos from './todos'
import {postsByMail,selectedMail} from './mail'

const rootReducer = combineReducers({
  todos,
  postsByMail,
  selectedMail
})

export default rootReducer
