import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { watchEventos } from '../actions';

class EventPage extends React.Component {
    componentDidMount() {
        this.props.watchEventos();

    }

    renderBtns() { 
        return (
            <View>
                <View style={styles.btn}>
                    <Button
                        title='Adicionar novo evento'
                        onPress={() => this.props.navigation.navigate('InsertEvent')}
                    />
                </View>
                
                <View style={styles.btn}>
                    <Button
                        title='Ir para lista de compras'
                        onPress={() => this.props.navigation.navigate('ItemPage')}
                    />
                </View>
                <Text style={styles.link} onPress={() => this.props.navigation.navigate('InfoPage')}>
                Sobre o app
                </Text>
            </View>
        )
    }

    render() {
        if(this.props.eventos === null ) {
            return (
                <View>
                    <Text style={styles.aviso}>Sua lista de eventos está vazia :(</Text>
                    {this.renderBtns()}
                </View>
            )
        }

        return (
            <View>
                <FlatList
                data={this.props.eventos}
                keyExtractor={item =>  item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('EventInfo', {evento: item} )
                        }}>
                            <View style={styles.item}>
                                <Text style={styles.text}>{item.titulo}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}/>
                {this.renderBtns()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        backgroundColor: "#c5c5c5",
        flexGrow: 1,
        margin: 4,
        padding: 20
    },
    text: {
        color: "black",
        fontSize: 25
    },
    link: {
        color: "blue",
        fontSize: 15,
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20
    },
    btn: {
        margin: 10
    },
    aviso: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    }
});

const mapStateToProps = state => {
    const {listaEvento} = state;

    if(listaEvento === null) {
        return {eventos: listaEvento};
    }

    const keys = Object.keys(listaEvento);
    const listaEventosWithId = keys.map(key => {
    return { ...listaEvento[key], id: key }
    })
    return {eventos : listaEventosWithId};
}

export default connect(
    mapStateToProps, 
    {watchEventos}
  )(EventPage);