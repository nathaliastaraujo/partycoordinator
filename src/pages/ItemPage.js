import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator, Alert} from 'react-native';
import { connect } from 'react-redux';
import { watchItems, deleteItem } from '../actions';

class ItemPage extends React.Component {
    componentDidMount() {
        this.props.watchItems();
    }

    renderBtn() {
        return (
            <View>
                <Button
                        title='Inserir item'
                        onPress={() => {this.props.navigation.navigate('InsertItem')}}
                /> 
            </View>
        )
    }

    render() {
        if(this.props.items === null) {
            return (
                <View>
                    <Text style={styles.aviso}>Sua lista de compras está vazia :(</Text>
                    {this.renderBtn()}
                </View>
            )
        }

        return (
            <View>
                {this.renderBtn()}
                <FlatList
                data={this.props.items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={ () => {
                            Alert.alert(
                                'Informe sua opção',
                                'O que deseja fazer com o item selecionado?',
                                [
                                    {
                                        text: 'Alterar',
                                        onPress: () => {
                                            this.props.navigation.replace('InsertItem', {itemToEdit: item})
                                        }
                                    },
                                    {
                                        text: 'Excluir',
                                        onPress: async () => { 
                                            const hasDeleted = await this.props.deleteItem(item);
              
                                            if(hasDeleted) {
                                                Alert.alert(
                                                    'Item excluido!'
                                                )
                                            }
                                        }
                                    }
                                ]
                            );
                        }}>
                            <View style={styles.item}>
                                <Text style={styles.text}>{item.nome}</Text>
                                <Text style={styles.text}>Quantidade: {item.quantidade}</Text>
                            </View>
                    </TouchableOpacity>
                    );
                }}
                />
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
        fontSize: 20
    },
    aviso: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    }
});


const mapStateToProps = state => {
    const {listaItem} = state;

    if(listaItem === null) {
        return {items: listaItem};
    }

    const keys = Object.keys(listaItem);
    const listaItemsWithId = keys.map(key => {
    return { ...listaItem[key], id: key }
    })
    return {items : listaItemsWithId};
   
}
  

export default connect(mapStateToProps, {watchItems, deleteItem})(ItemPage);
