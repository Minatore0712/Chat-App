import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: " ",
      backgroundColor: " ",
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-image.png")}
        style={styles.imgBackground}
      >
         <View style={styles.main}>
            <Text style={styles.title}>Chat-App</Text>
          </View>

          <View style={styles.chatOptions}>
          <TextInput
            style={styles.nameInput}
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
            placeholder="add username"
          />
          <View style={styles.box}>
          <Text style={styles.backgroundColorText}>Choose a background colour</Text>
          <View style={styles.btnColor}>
            <TouchableOpacity
              style={styles.btnColor1}
              onPress={(color) => this.setState({ backgroundColor: "#090C08" })}
            />
            <TouchableOpacity
              style={styles.btnColor2}
              onPress={(color) => this.setState({ backgroundColor: "#474056" })}
            />
            <TouchableOpacity
              style={styles.btnColor3}
              onPress={(color) => this.setState({ backgroundColor: "#8A95A5" })}
            />
            <TouchableOpacity
              style={styles.btnColor4}
              onPress={(color) => this.setState({ backgroundColor: "#B9C6AE" })}
            />
          </View>
          </View>

          
          <View style={styles.startText}>
            <Button
              accessible={true}
              accessibilityLabel="More options"
              accessibilityHint="Lets you choose to send an image or your geolocation."
              accessibilityRole="button"
              color="#757083"
              title="Start Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  userName: this.state.userName,
                  backgroundColor: this.state.backgroundColor,
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    top: 30,
  },
  main: {
    flex: 0.35,
  },
  chatOptions: {
    flex: 0.5,
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    paddingLeft: "5%",
    paddingRight: "5%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  nameInput: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1.5,
    borderColor: "#757083",
    borderRadius: 2,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    paddingLeft: "3%",
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#757083",
    marginBottom: 10,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#757083",
    height: 60,
  },
  startText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 60,
  },
  box: {
    flexDirection: "column",
  },
  btnColor: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnColor1: {
    backgroundColor: "#090C08",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor2: {
    backgroundColor: "#474056",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor3: {
    backgroundColor: "#8A95A5",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  btnColor4: {
    backgroundColor: "#B9C6AE",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});