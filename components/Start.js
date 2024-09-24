import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useState } from "react";

const Start = ({navigation}) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    return (
        <View style={styles.container}> 
            <ImageBackground source={require('../assets/background-img.png')} style={styles.backgroundImg}>         
                <Text style={styles.title}>Chat App</Text>
                <View style={styles.box}>
                    <TextInput 
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder="Your Name"
                    />
                    <View style={styles.chooseColorBox}>
                        <Text style={styles.chooseColorText}>Choose a background color:</Text>
                        <View style={styles.colorContainer}>
                            <TouchableOpacity 
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityHint="Allows you to choose the background color of your chatroom"
                                style={[styles.colors, {backgroundColor: '#090C08', opacity: backgroundColor === '#090C08' ? 1 : 0.3} ]}
                                onPress={() => setBackgroundColor('#090C08')}
                                /> 
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityHint="Allows you to choose the background color of your chatroom" 
                                style={[styles.colors, {backgroundColor: '#474056', opacity: backgroundColor === '#474056' ? 1 : 0.3} ]}
                                onPress={() => setBackgroundColor('#474056')}
                                />
                            <TouchableOpacity 
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityHint="Allows you to choose the background color of your chatroom"
                                style={[styles.colors, {backgroundColor: '#8A95A5', opacity: backgroundColor === '#8A95A5' ? 1 : 0.3} ]}
                                onPress={() => setBackgroundColor('#8A95A5')}
                                />
                            <TouchableOpacity 
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityHint="Allows you to choose the background color of your chatroom"
                                style={[styles.colors, {backgroundColor: '#B9C6AE', opacity: backgroundColor === '#B9C6AE' ? 1 : 0.3} ]}
                                onPress={() => setBackgroundColor('#B9C6AE')}
                                />
                        </View>
                    </View>
                    <TouchableOpacity 
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityHint="Grants access to the chatroom"
                        style={styles.button}
                        onPress={() => navigation.navigate('Chat', {name: name, backgroundColor: backgroundColor })}
                        >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" />: null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 250,
        marginTop: 50
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        width: '88%',
        padding: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#757083',
    },
    chooseColorBox: {
        width: '88%'
    },
    chooseColorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
    },
    colorContainer: {
        flexDirection: 'row'
    },
    colors: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5 
    },
    button: {
        backgroundColor: '#757083',
        width: '88%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    backgroundImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    box: {
        backgroundColor: '#ffffff', 
        borderRadius: 4,
        width: '88%',
        height: '44%', 
        alignItems: 'center',
        justifyContent: 'space-around', 
      },
});

export default Start;