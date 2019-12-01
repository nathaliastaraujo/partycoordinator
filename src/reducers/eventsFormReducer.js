import { SET_FIELD, EVENTO_SAVED_SUCCESS, SET_ALL_FIELDS, RESET_FORM} from '../actions';
import eventsReducer from './eventsReducer';

const INITIAL_STATE = {
  id: null,
  titulo: '',
  descricao: '',
  local: '',
  data: '',
  horario: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_FIELD:
      const clonedState = {...state};
      clonedState[action.field] = action.value;
      return clonedState;
    case EVENTO_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_FIELDS:
      return action.evento;
    case RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}