import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemList = props => {
    const {item, onPressItem} = props;

    return (
        <TouchableOpacity>
            <View style={styles.line}>
                <Text style={styles.lineText}>
                    {item.titulo}
                    {item.quantidade}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        alignItems: 'center',
        flexDirection: 'row'
    },

    lineText: {
        fontSize: 20,
        paddingLeft: 15,
        flex: 7
    },

    avatar: {
        aspectRatio: 1,
        flex: 1,
        marginLeft: 15,
        borderRadius: 20
    }
});


export default ItemList;