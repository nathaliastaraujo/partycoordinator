import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const FormRow = (props) => { // chaves pq são multiplas instruções
    const {children} = props;

    return(
        <View style={styles.container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 2,
        marginBottom: 2,
        elevation: 1,
    }
});

export default FormRow;