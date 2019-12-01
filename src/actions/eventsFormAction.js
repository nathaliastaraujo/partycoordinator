import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
 return {
    type: SET_FIELD,
    field,
    value
  }
}

export const EVENTO_SAVED_SUCCESS = 'EVENTO_SAVED_SUCCESS';
export const eventoSavedSuccess = () => {
  return {
    type: EVENTO_SAVED_SUCCESS
  }
}

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = evento => ({
  type: SET_ALL_FIELDS,
  evento: evento
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

export const saveEvento = evento => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if(evento.id) {
      await firebase 
      .database()
      .ref(`/users/${currentUser.uid}/eventos/${evento.id}`)
      .set(evento);

    } else {
      await firebase 
        .database()
        .ref(`/users/${currentUser.uid}/eventos`)
        .push(evento);
    }
      
    dispatch(eventoSavedSuccess());
  }
}