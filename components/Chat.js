import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


const Chat = ({ db, route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { name, backgroundColor, userID } = route.params;

    // adds new messages to the messages state
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    // changes color of text bubbles
    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      }

    useEffect(() => {
        // sets selected name from start screen
        navigation.setOptions({ title: name });

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (messagesSnapshot) => {
            let newMessages = [];
            messagesSnapshot.forEach(doc => {
                newMessages.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    createdAt: new Date(doc.data().createdAt.toMillis()) 
                })
            });
            setMessages(newMessages);
        })

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <GiftedChat 
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{ _id: userID, name: name }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" />: null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 35
    },
    hello: {
        color: '#fff',
    }
});

export default Chat;