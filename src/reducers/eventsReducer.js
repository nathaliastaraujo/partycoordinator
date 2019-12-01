import {SET_EVENTO} from '../actions';


export default function(state = null, action) {
  switch(action.type) {
    case SET_EVENTO:
      return action.eventos;
    default:
      return state;
  }
}