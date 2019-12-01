import {SET_ITEM} from '../actions';


export default function(state = null, action) {
  switch(action.type) {
    case SET_ITEM:
      return action.items;
    default:
      return state;
  }
}