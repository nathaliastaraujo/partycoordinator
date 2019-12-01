import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import Line from '../components/Line';
import LongText from '../components/LongText';

class InfoPage extends React.Component {
  render() {
    return(
    <ScrollView>
        <Line label="App" content="Party Coordinator" />
        <Line label="Versão" content="1.0"/>
        <Line label="Autora" content="Nathália S. Araújo, 2019" />
        <LongText label="Informações" content=
            "Este aplicativo foi desenvolvido como projeto final para a disciplina de Programação para Dispositivos Móveis. O Party Coordinator tem como objetivo auxiliar o usuário a coordenar eventos, atuando como uma agenda e um marcador para organizar as tarefas que sejam necessárias para a realização de um evento. Assim, a primeira página do aplicativo é responsável pelo login, que garante que apenas você tenha acesso às informações compartilhadas. A página seguinte, inicial, mostra os eventos criados por você e permite o cadastramento de mais eventos. Por essa mesma página, é possível acessar também a Lista de Compras, onde é possível adicionar itens e deletá-los quando não for mais necessário. Espero que goste do app!"
        />
      </ScrollView>
    );
  }
}

export default InfoPage;