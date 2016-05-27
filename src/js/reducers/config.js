import { ADD_MAIL, DELETE_MAIL, ADD_MEDIA, DELETE_MEDIA} from '../constants/ActionTypes'

const initialState = []

export  function mails(state = initialState, action) {
  switch (action.type) {
    case ADD_MAIL:
      return [
        {
          id: state.reduce((maxId, mail) => Math.max(mail.id, maxId), -1) + 1,
          text: action.text
        },
        ...state
      ]

    case DELETE_MAIL:
      return state.filter(mail =>
        mail.id !== action.id
      )

    default:
      return state
  }
}

export function medias(state = initialState, action) {
  switch (action.type) {
      case ADD_MEDIA:
          let item = Object.assign({},action.posts[0],{
              mid: state.reduce((maxId, media) => Math.max(media.id, maxId), -1) + 1
          })
          return [
              item,
              ...state
          ]

    case DELETE_MEDIA:
      return state.filter(media =>
        media.mid !== action.id
      )

    default:
      return state
  }
}
