import { GET_ALL_ROLE_SUCCESS, GET_ALL_ROLE_FAILURE } from '../actions/types'

const initialState = {
  roles: [],
  error: null
}

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        error: null
      }
    case GET_ALL_ROLE_FAILURE:
      return {
        ...state,
        roles: [],
        error: action.payload
      }
    default:
      return state
  }
}

export default roleReducer
