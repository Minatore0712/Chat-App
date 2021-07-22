import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar  } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebase = require("firebase");
require("firebase/firestore");

//config to allow the app to connect to Firestore.
const firebaseConfig = {
  apiKey: "AIzaSyBfohs7Y3T5IZIwRz5x4dL8WEgUFX8HWEg",
  authDomain: "test-56fa0.firebaseapp.com",
  projectId: "test-56fa0",
  storageBucket: "test-56fa0.appspot.com",
  messagingSenderId: "1045240985998",
  appId: "1:1045240985998:web:5ef257003061a304978cdf",
  measurementId: "G-4XGKKQSDNK",
};

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: null,
      },
      isConnected: false,
    };
    //connect to firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //reference the collection in firebase
    this.referenceChatMessages = firebase.firestore().collection("message");
  }

  //fetch and display existing messages
  componentDidMount() {
    const { name } = this.props.route.params;

    // checks user connect
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });

        // authenticates user with firebase
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            this.setState({
              user: {
                _id: 2,
                name: name,
                avatar: "https://placeimg.com/140/140/any",
              },
              messages: [],
            });

            // listens for changes to DB
            this.unsubscribeChatUser = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeChatUser();
  }

  // updates messages on client-side when new message added to DB
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // goes through each document
    querySnapshot.forEach((doc) => {
      // gets QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: new Date(),
        user: data.user,
      });
    });

    //access the user’s name
    const userName = this.props.route.params.userName;
    this.props.navigation.setOptions({ title: `${userName}'s Chatroom` });
    this.setState({
      messages,
    });
  };

   // Adds messages to cloud storage
   addMessages = () => {
    const messages = this.state.messages[0];
    firebase
      .firestore()
      .collection("message")
      .add({
        _id: messages._id,
        text: messages.text,
        createdAt: messages.createdAt,
        user: {
          _id: messages.user._id,
          name: messages.user.name,
        },
      })
      .then()
      .catch((error) => console.log("error", error));
  };


      // allows offline access to messages retrieved from client-side storage
      getMessages = async () => {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('message') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

      // saves new message to client-side storage
      saveMessages = async () => {
        try {
            await AsyncStorage.setItem('message', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    // deletes messages from client-side storage
    deleteMessages = async () => {
        try {
            await AsyncStorage.removeItem('message');
            this.setState({
                messages: []
            });
        } catch (error) {
            console.log(error.message);
        }
    }

   // adds new message to messages array in state
   onSend(messages = []) {
    this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
    }),
        () => {
            this.addMessages();
            this.saveMessages();
        }
    );
}

    // disables message input bar if offline
    renderInputToolbar = props => {
      if (this.state.isConnected === false) {
      } else {
          return <InputToolbar {...props} />;
      }
  }

  //change bubble color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "black",
          },
        }}
      />
    );
  }

  render() {
    //access the user’s name
    let userName = this.props.route.params.userName;
    //access the background colour selected
    let backgroundColor = this.props.route.params.backgroundColor;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar}
          renderUsernameOnMessage={true}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 2,
            name: userName,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
  item: {
    fontSize: 20,
    color: "blue",
  },
  text: {
    fontSize: 30,
  },
});
