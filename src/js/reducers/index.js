import { combineReducers } from 'redux'
import tod from './todos'
import mail from './mail'

const rootReducer = combineReducers({
  tod,
  mail
})

export default rootReducer
