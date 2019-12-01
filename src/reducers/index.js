import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventsFormReducer from './eventsFormReducer';
import eventsReducer from './eventsReducer';
import listaFormReducer from './listaFormReducer';
import listaReducer from './listaReducer';

export default combineReducers({
  user: userReducer,
  eventoForm: eventsFormReducer,
  listaEvento: eventsReducer,
  itemForm: listaFormReducer,
  listaItem: listaReducer
});