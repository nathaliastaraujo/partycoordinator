import React from 'react';
import { View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import FormRow from '../components/FormRow';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { setItemField, saveItem, setAllItemFields, resetItemForm} from '../actions';

class InsertItem extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false
        }
    }

    componentDidMount() {

        const {navigation, setAllItemFields, resetItemForm} = this.props;
        const { params } = navigation.state;
    
        if(params && params.itemToEdit) {
          setAllItemFields(params.itemToEdit)
        } else {
          resetItemForm();
        }
    }
    

    render() {
        const { itemForm, setItemField, saveItem, navigation } = this.props;
        return (
            <View>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Item"
                        value={itemForm.nome}
                        onChangeText={valor => setItemField('nome', valor)}
                    />
                </FormRow>
                <FormRow>
                    <NumericInput 
                        value={itemForm.quantidade}
                        onChange={valor => {
                            setItemField('quantidade', valor);
                          }}
                        minValue='1'
                        maxValue='500'
                    />
                </FormRow>

                {
                    this.state.isLoading ?
                        <ActivityIndicator/>
                        :
                        <Button
                        title="Adicionar item"
                        onPress={async () => {
                            this.setState({ isLoading: true })

                            try {
                                await saveItem(itemForm);
                                navigation.goBack();
                            } catch (error) {
                                Alert.alert('Erro', error.message);
                            } finally {
                                this.setState({ isLoading: false })
                            }

                        }} />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
    },

    textMessage: {
        fontSize: 20,
        padding: 25,
        alignContent: 'center'
    }
});

const mapStateToProps = (state) => {
    return ({
      itemForm: state.itemForm
    })
}
  
const mapDispatchToProps = {
    setItemField,
    saveItem,
    setAllItemFields,
    resetItemForm
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertItem);