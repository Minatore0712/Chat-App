import { Assets } from "@react-navigation/stack";
import React from "react";
import {
  ImageBackground,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  
} from "react-native";

const image = require('../assets/background-image.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", btnColor: "#757083" };
  }

  render() {
    let { btnColor,name } = this.state


  const onPressChat = (name) => {
    if (name === "") {
      return Alert.alert('Please Enter Your Name to Continue.');
    }
  };

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          source={require('../assets/background-image.png')}
        >
          <View style={styles.main}>
            <Text style={styles.title}>Chat-App</Text>
          </View>
          <View style={styles.chatOptions}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your name'
            />
            <View style={styles.box}>
              <Text
                style={styles.backgroundColorText}>
                Choose Background Color:
              </Text>
              <View style={styles.btnColor}>
                <TouchableOpacity
                  style={styles.btnColor1}
                  onPress={() => this.setState({ btnColor: '#090C08' })}
                />
                <TouchableOpacity
                  style={styles.btnColor2}
                  onPress={() => this.setState({ btnColor: '#474056' })}
                />
                <TouchableOpacity
                  style={styles.btnColor3}
                  onPress={() => this.setState({ btnColor: '#8A95A5' })}
                />
                <TouchableOpacity
                  style={styles.btnColor4}
                  onPress={() => this.setState({ btnColor: '#B9C6AE' })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: btnColor, height: 60, }}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, btnColor: this.state.btnColor })}
            >
              <Text style={styles.startText}
              onPress={() => onPressChat(name)}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    top: 30,
  },
  main: {
    flex: 0.35,
  },
  chatOptions: {
    flex: 0.50,
    backgroundColor: 'white',
    width: '88%',
    height: '44%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  nameInput: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderColor: '#757083',
    borderRadius: 2,
    fontSize: 16,
    fontWeight: "300",
    color: '#757083',
    paddingLeft: '3%',
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757083',
    marginBottom: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: '#757083',
    height: 60,
  },
  startText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 60,
  },
  box: {
    flexDirection: 'column'
  },
  btnColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnColor1: {
    backgroundColor: '#090C08',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor2: {
    backgroundColor: '#474056',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor3: {
    backgroundColor: '#8A95A5',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor4: {
    backgroundColor: '#B9C6AE',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
})