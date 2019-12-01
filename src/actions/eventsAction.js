import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_EVENTO = 'SET_EVENTO';
const setEvento = eventos => ({
  type: SET_EVENTO,
  eventos: eventos
})

export const watchEventos = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/eventos`)
      .on('value', snapshot => {
        const eventos = snapshot.val();
        const action = setEvento(eventos);
        dispatch(action);
      })
  }
}

export const deleteEvento = evento => {
  
    return dispatch => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Exclusão', 
          `Deseja excluir o evento ${evento.titulo}?`, 
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
                  .ref(`/users/${currentUser.uid}/eventos/${evento.id}`)
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