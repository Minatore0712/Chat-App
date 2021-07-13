import React from "react";
import { View, Text, Button } from "react-native";

export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.state = {
      btnColor: this.props.route.params.btnColor,
    };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: this.state.btnColor,
        }}
      >
      </View>
    );
  }
}
