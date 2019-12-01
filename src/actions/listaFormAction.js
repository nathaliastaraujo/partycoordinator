import firebase from 'firebase';

export const SET_ITEM_FIELD = 'SET_ITEM_FIELD';

export const setItemField = (field, value) => {
 return {
    type: SET_ITEM_FIELD,
    field,
    value
  }
}

export const ITEM_SAVED_SUCCESS = 'ITEM_SAVED_SUCCESS';
export const itemSavedSuccess = () => {
  return {
    type: ITEM_SAVED_SUCCESS
  }
}

export const SET_ALL_ITEM_FIELDS = 'SET_ALL_ITEM_FIELDS';
export const setAllItemFields = item => ({
  type: SET_ALL_ITEM_FIELDS,
  item: item
});

export const RESET_ITEM_FORM = 'RESET_ITEM_FORM';
export const resetItemForm = () => ({
  type: RESET_ITEM_FORM
})

export const saveItem = item => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if(item.id) {
      await firebase 
      .database()
      .ref(`/users/${currentUser.uid}/lista/${item.id}`)
      .set(item);

    } else {
      await firebase 
        .database()
        .ref(`/users/${currentUser.uid}/lista`)
        .push(item);
    }
      
    dispatch(itemSavedSuccess());
  }
}