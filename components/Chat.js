import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";


const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <Text style={styles.hello}>Hello Chat Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hello: {
        color: '#fff',
    }
});

export default Chat;