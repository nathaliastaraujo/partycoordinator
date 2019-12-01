import React from 'react';
import { View, TextInput, StyleSheet, Button, Alert, TimePickerAndroid,
        DatePickerAndroid, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setField, saveEvento, setAllFields, resetForm} from '../actions';
import { ScrollView } from 'react-native-gesture-handler';

class InsertEvent extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false
      }
    }

    componentDidMount() {

        const {navigation, setAllFields, resetForm} = this.props;
        const { params } = navigation.state;
    
        if(params && params.eventoToEdit) {
          setAllFields(params.eventoToEdit)
        } else {
          resetForm();
        }
    }

    openPicker = async () => {
        try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                  // Use `new Date()` for current date.
                  // May 25 2020. Month 0 is January.
                  date: new Date(2019, 11, 30),
                });
                if (action == DatePickerAndroid.dateSetAction) {
                  // Selected year, month (0-11), day

                  this.setState(
                    {
                        choosenDate: `${day}/${month+1}/${year}`
                    });
                    this.props.setField('data', `${day}/${month+1}/${year}`);

          
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }
    }

    renderDate() {
        const {choosenDate} = this.state;

        if(!choosenDate)
            return null;
        
        return(
            <View>
                <Text style={styles.pickers}>
                    {choosenDate}
               </Text>
        </View>
            );
    }

    openTimePicker = async () => {
        try {
                const {action, hour, minute} = await TimePickerAndroid.open({
                  hour: 14,
                  minute: 0,
                  is24Hour: true
                });
                if (action !== TimePickerAndroid.dismissedAction) {
                  // Selected hour (0-23), minute (0-59)
                  this.setState({choosenTime: hour + ":" + minute});
                  this.props.setField('horario', `${hour}:${minute}`);
                //  console.log('Horario: ' + hour + ":" + minute)
                }
              } catch ({code, message}) {
                console.warn('Cannot open time picker', message);
              }
    }

    renderTime() {
        const {choosenTime} = this.state;

        if(!choosenTime)
            return null;
        
        return(
            <View>
                <Text style={styles.pickers}>
                    {choosenTime}
                </Text>
            </View>
            );
    }

    render() {
        const { eventoForm, setField, saveEvento, navigation } = this.props;
        return(
            <ScrollView>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Titulo"
                        value={eventoForm.titulo}
                        onChangeText={valor => setField('titulo', valor)}
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Descrição"
                        value={eventoForm.descricao}
                        onChangeText={valor => setField('descricao', valor)}
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Local"
                        value={eventoForm.local}
                        onChangeText={valor => setField('local', valor)}
                    />
                </FormRow>
                <FormRow>
                        <TouchableOpacity onPress={() => this.openPicker()}>
                                <View>

                                    <Text style={styles.pickers}>Toque para escolher a data. </Text>
                                    {this.renderDate()}
                                        
                                </View>
                        </TouchableOpacity>
                </FormRow>
                <FormRow>
                        <TouchableOpacity onPress={() => this.openTimePicker()}>
                                <View>

                                    <Text style={styles.pickers}>Toque para escolher o horário. </Text>
                                    {this.renderTime()}
                                        
                                </View>
                        </TouchableOpacity>
                </FormRow>

                {
                    this.state.isLoading ?
                        <ActivityIndicator />
                        :
                        <Button
                        title="Salvar"
                        onPress={async () => {
                            this.setState({ isLoading: true })

                            try {
                            await saveEvento(eventoForm);
                            navigation.goBack();
                            } catch (error) {
                            Alert.alert('Erro', error.message);
                            } finally {
                            this.setState({ isLoading: false })
                            }

                        }} />
                }
            </ScrollView>
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
    },

    pickers: {
        fontSize: 20
    }
});

const mapStateToProps = (state) => {
    return ({
      eventoForm: state.eventoForm
    })
}
  
  const mapDispatchToProps = {
    setField,
    saveEvento,
    setAllFields,
    resetForm
  }

export default connect(mapStateToProps, mapDispatchToProps)(InsertEvent);