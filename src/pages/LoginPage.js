import React from 'react';
import { View, TextInput, StyleSheet, Button, 
        ActivityIndicator, Text, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { processLogin } from '../actions';

class LoginPage extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        email: "novoteste@teste.com",
        password: "teste123",
        isLoading: false,
        message: "",
      }
    }

    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyAQqsFQeJ1W6OqjBg_cZULRf5b_jxeiUPs",
            authDomain: "party-coordinator.firebaseapp.com",
            databaseURL: "https://party-coordinator.firebaseio.com",
            projectId: "party-coordinator",
            storageBucket: "",
            messagingSenderId: "488738646981",
            appId: "1:488738646981:web:1196c380437d6f09c2b9ac"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    onChangeHandler(field, valor) {
        this.setState({
          [field]: valor
        })
    }

    processLogin() {
        this.setState({ isLoading: true });
        const {email, password} = this.state;
    
        this.props.processLogin({email, password})
          .then( user => {
    
            if(user) {
              this.props.navigation.replace('Main');
            } else {
    
              this.setState({
                isLoading: false,
                message: '',
              })
            }
          })
          .catch( error => {
            this.setState({ 
              isLoading: false,
              message: this.getMessageByError(error.code),
            });
          })
    }
    
      getMessageByError(code) {
        switch(code) {
          case "auth/user-not-found":
            return "E-mail inexistente.";
          case "auth/wrong-password":
            return "Senha incorreta."
          default:
            return "Erro desconhecido.";
        }
      }
    
    renderButton() {
        if(this.state.isLoading) // se for verdadeira
            return <ActivityIndicator/>;

        return(
            <Button
                title='Login'
                onPress={() => this.processLogin()}
            />
        )
    }

    renderMessage() {
        const {message} = this.state;

        if(!message)
            return null;
        
            return(
                <View>
                    <Text style={styles.textMessage}>
                        {message}
                    </Text>
                </View>
            );
    }


    render() {
        return (
            <View>
                <Text style={styles.textMessage}>Organize todos os seus eventos em um só lugar, de forma rápida e prática!
                {'\n'}{'\n'}Faça login para continuar.</Text>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="seuemail@email.com"
                        value={this.state.email}
                        onChangeText={valor => {
                            this.onChangeHandler('email', valor)
                          }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.textInput}
                        placeholder="informe a sua senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={valor => { this.onChangeHandler('password', valor) }}
                    />
                </FormRow>

                {this.renderButton()}

                {this.renderMessage()}

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

export default connect(null, {processLogin})(LoginPage);