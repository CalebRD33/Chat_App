import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import Start from './components/Start.js';
import Chat from './components/Chat.js';

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDyrWweIibPAl6d-4-KZZvWYQLPjKsvY8o",
    authDomain: "chat-app-1cf92.firebaseapp.com",
    projectId: "chat-app-1cf92",
    storageBucket: "chat-app-1cf92.appspot.com",
    messagingSenderId: "86283531388",
    appId: "1:86283531388:web:bf900b3318cdeade37c5f9"
  };

  // initialize firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
