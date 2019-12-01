import {createAppContainer, createStackNavigator, NavigationActions} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import InsertEvent from './pages/InsertEvent';
import EventInfo from './pages/EventInfo';
import InsertItem from './pages/InsertItem';
import ItemPage from './pages/ItemPage';
import InfoPage from './pages/InfoPage';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: "Party Coordinator"
    }
  },
  
  'Main': {
    screen: EventPage,
    navigationOptions: {
      title: "Eventos"
    }
  },

  'InfoPage': {
    screen: InfoPage,
    navigationOptions: {
      title: "Informações do App"
    }
  },  
  
  'InsertEvent': {
    screen: InsertEvent,
    navigationOptions: ({navigation}) => {
      if(navigation.state.params && navigation.state.params.eventoToEdit) {
        return {
          title: navigation.state.params.eventoToEdit.titulo
        }
      }

      return {
        title: "Adicionar evento"
      };
  }
  }, 

  'InsertItem': {
    screen: InsertItem,
    navigationOptions: ({navigation}) => {
      if(navigation.state.params && navigation.state.params.itemToEdit) {
        return {
          title: navigation.state.params.itemToEdit.nome
        }
      }

      return {
        title: "Adicionar item"
      }
    }
  },

  'EventInfo': {
    screen: EventInfo,
    navigationOptions: {
      title: "Informações do evento"
    }
  },

  'ItemPage': {
    screen: ItemPage,
    navigationOptions: {
      title: "Lista de compras"
    }
  }
}, {
  defaultNavigationOptions: { 
    title: "Minhas séries",
    headerTintColor: 'white', // cor da setinha
    headerStyle: {
      backgroundColor: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 25,
      textAlign: 'center'
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;