import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";
import MapView from 'react-native-maps';


const Chat = ({ db, route, navigation, isConnected, storage}) => {
    const [messages, setMessages] = useState([]);
    const { name, backgroundColor, userID } = route.params;

    let unsubMessages;

    useEffect(() => {
        // sets selected name from start screen
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (messagesSnapshot) => {
                let newMessages = [];
                messagesSnapshot.forEach(doc => {
                    newMessages.push({ 
                        id: doc.id, 
                        ...doc.data(), 
                        createdAt: new Date(doc.data().createdAt.toMillis()) 
                    })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

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
              backgroundColor: "#636363"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    {...props}
                    style={{width: 200,
                    height: 150,
                    borderRadius: 13,
                    margin: 3}}
                    region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    const renderCustomActions = (props) => {
        return <CustomActions userID={userID} onSend={onSend} storage={storage} {...props} name={name} />;
    };

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <GiftedChat 
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
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