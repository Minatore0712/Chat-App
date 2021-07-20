import React from "react";
import {
  View,
  Text,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCYhM7ZWoVZLLUD5xzpcepyID3B5w1sfuE",
  authDomain: "test-8b82a.firebaseapp.com",
  databaseURL: "https://test-8b82a.firebaseio.com",
  projectId: "test-8b82a",
  storageBucket: "test-8b82a.appspot.com",
  messagingSenderId: "202131758796",
};

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      btnColor: "",
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: null,
      },
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
    // authenticate the user
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }

      // create a reference to the active user's documents
      this.referenceChatMessages = firebase.firestore().collection("message");
      // listen for collection changes for current user
      this.unsubscribeMessages = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    this.setState({
      btnColor: this.props.route.params.btnColor,
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === "function") {
      this.unsubscribe();
    }
  }

  //when something changes in the messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });

    //access the user’s name
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: `${name}'s Chatroom` });
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

  //Event handler for sending messages
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.btnColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderUsernameOnMessage={true}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
            name: name,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
