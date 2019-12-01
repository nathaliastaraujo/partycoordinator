import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_ITEM = 'SET_ITEM';
const setItem = items => ({
  type: SET_ITEM,
  items: items
})

export const watchItems = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/lista`)
      .on('value', snapshot => {
        const items = snapshot.val();
        const action = setItem(items);
        dispatch(action);
      })
  }
}

export const deleteItem = item => { 
    return dispatch => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Exclusão', 
          `Deseja excluir o item?`, 
          [{
            text: 'Não',
            onPress: () => {
              resolve(false);
            },
            style: 'cancel' //IOS
          },{
            text: 'Sim',
            onPress: async () => {
              const { currentUser } = firebase.auth();

              try {
                await firebase
                .database()
                  .ref(`/users/${currentUser.uid}/lista/${item.id}`)
                  .remove();

                resolve(true);
              } catch(e) {
                reject(e);
              }

            }
          }
        ],
        { cancelable: false }
        )
      })
    }
}