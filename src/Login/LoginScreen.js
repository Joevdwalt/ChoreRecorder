import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import { TextInput } from "react-native-gesture-handler";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login, loadAppState } from "./LoginActions/";

import { StackActions, NavigationActions } from "react-navigation";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: null
  };

  state = {
    username: "joevdwalt",
    password: "joevdwalt"
  };
  componentDidMount(){
    this.props.loadAppState();
  }
  componentDidUpdate(prevProps) {
    if (this.props.choreRecorderState.loggedin) {
      this.props.navigation.dispatch(navigateToMain);
    }
  }

  _loginFailure = () => {
    if (this.props.choreRecorderState.logginFailureReason.length > 0) {
      return (
        <Text style={ERRORTEXT.text}>
          {this.props.choreRecorderState.logginFailureReason}
        </Text>
      );
    } else {
      return;
    }
  };

  _redirectIfLoggedin = () => {};

  render() {
    return (
      <ImageBackground
        source={require("../Images/Login.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={TITLE.text}>Welcome to the chores app</Text>
        </View>
        <View
          style={{
            

            justifyContent: "space-between",
            position: "absolute", //Here is the trick
            bottom: "5%", //Here is the trick
            width: "100%",
            margin: 0,
            padding: 0
          }}
        >
          <View style={TEXTINPUTBACKGROUND.viewstyle}>
            <TextInput
              style={TEXTINPUT.input}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            />
          </View>

          <View style={TEXTINPUTBACKGROUND.viewstyle}>
            <TextInput
              style={TEXTINPUT.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <View>
            <TouchableOpacity
              style={BUTTON.button}
              disabled={this.props._loggingIn}
              onPress={() => {
                this.props.login(this.state);
              }}
            >
              <Text style={WHITETEXT.text}> Sign in </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(navigateToRegister)}
          >
            <Text style={{ color: "blue" }}>Create account</Text>
          </TouchableOpacity>
          {this._loginFailure()}
          {this._redirectIfLoggedin()}
        </View>
      </ImageBackground>
    );
  }
}
 
const navigateToRegister = NavigationActions.navigate({
  routeName: "Register",
  params: {},
  action: NavigationActions.navigate({ routeName: "Register" })
});

const navigateToMain = NavigationActions.navigate({
  routeName: "Main",
  params: {},
  action: NavigationActions.navigate({ routeName: "Main" })
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,loadAppState
    },
    dispatch
  );

const mapStateToProps = state => {
  const { choreRecorderState } = state;
  return { choreRecorderState };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const TEXT = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#00BCD4",
    fontFamily: "Montserrat"
  }
});

const ERRORTEXT = StyleSheet.create({
  text: {
    ...TEXT.text,
    color: "#00BCD4",
    marginTop: 7,
    textAlign: "center"
  }
});

const WHITETEXT = StyleSheet.create({
  text: {
    ...TEXT.text,
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  }
});
const TITLE = StyleSheet.create({
  text: {
    ...TEXT.text,
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "MontserratExtraBold",
    marginTop: 20,
    color: "#FEFDFD"
  }
});

const TEXTINPUTBACKGROUND = StyleSheet.create({
  viewstyle: {
    marginTop: 10,

    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  }
});

const TEXTINPUT = StyleSheet.create({
  input: {
    ...TEXT.text,

    backgroundColor: "transparent",
    color: "#243664",

    marginTop: 10,

    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    //borderBottomWidth: 1,
    //borderWidth: 1,
    //borderColor: "#00BCD4"
  }
});

const BUTTON = StyleSheet.create({
  button: {
    ...TEXT.text,
    textAlign: "center",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#4B70B9",
    borderRadius: 2,
    borderWidth: 0,
    fontWeight: "bold"
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 15
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",

    top: 0,
    margin: 0,
    padding: 0
  }
});
