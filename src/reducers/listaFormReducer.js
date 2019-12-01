import { SET_ITEM_FIELD, ITEM_SAVED_SUCCESS, SET_ALL_ITEM_FIELDS, RESET_ITEM_FORM} from '../actions';
import listaReducer from './listaReducer';

const INITIAL_STATE = {
  id: null,
  nome: '',
  quantidade: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_ITEM_FIELD:
      const clonedState = {...state};
      clonedState[action.field] = action.value;
      return clonedState;
    case ITEM_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_ITEM_FIELDS:
      return action.item;
    case RESET_ITEM_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}