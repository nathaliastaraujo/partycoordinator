import React from 'react';
import { ScrollView, Button, Alert, Text, StyleSheet, View } from 'react-native';
import Line from '../components/Line';

import {connect} from 'react-redux';
import {deleteEvento} from '../actions';

class EventInfo extends React.Component {

    render() {
        const { evento } = this.props.navigation.state.params;
        return(
            <ScrollView>
                <Line label="Título:" content={evento.titulo} />
                <Line label="Descrição:" content={evento.descricao} />
                <Line label="Local:" content={evento.local}/>
                <Line label="Data:" content={evento.data} />
                <Line label="Horário:" content={evento.horario} />


                <View style={styles.btn}>
                    <Button
                        title="Alterar informações"
                        onPress={ () => {
                            this.props.navigation.replace('InsertEvent', {eventoToEdit: evento})
                        }}
                    />
                </View>

                <View style={styles.btn}>
                    <Button
                        title="Excluir"
                        color="#FF0004"
                        onPress={ async () => {
                            const hasDeleted = await this.props.deleteEvento(evento)
              
                            if(hasDeleted) {
                              this.props.navigation.goBack();
                            }
                          }}
                    />
                </View>
            </ScrollView>
        )
    }
        
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        margin: 10
    },

    text: {
        fontSize: 20
    }
});

export default connect(null, {deleteEvento} )(EventInfo);