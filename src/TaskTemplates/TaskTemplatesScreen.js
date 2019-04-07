import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Button,
  Modal,
  TouchableHighlight
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { saveTaskTemplate, refreshItems } from "./TaskTemplateActions/";

class TaskTemplatesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    name: "",
    username: "",
    password: "",
    modalVisible: false
  };

  componentDidMount() {
    this.props.refreshItems(this.props.choreRecorderState);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _renderSaving = () => {
    if (this.props.choreRecorderState.saving) {
      return <Text>Saving ...</Text>;
    } else {
      return null;
    }
  };

  render() {
    return (
      <View
        style={MAINCONTAINER.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={TITLE.text}>Daily Tasks</Text>

        <FlatList
          refreshing={false}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() =>
            this.props.refreshItems(this.props.choreRecorderState)
          }
          data={this.props.choreRecorderState.taskTemplates}
          renderItem={({ item }) => (
            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <Text style={styles.taskitem}>{item.name}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={buttonStyle.container}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <AntDesign
            style={buttonStyle.addbutton}
            name="pluscircle"
            size={55}
          />
        </TouchableOpacity>
        {this._renderSaving()}

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Add new Task</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Close</Text>
              </TouchableHighlight>

              <Text style={TITLE.text}>Add new Task</Text>

              <TextInput
                style={TEXTINPUT.input}
                placeholder="Task name"
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />

              <View>
                <TouchableOpacity
                  style={BUTTON.button}
                  disabled={this.props._loggingIn}
                  onPress={() => {
                    this.props.saveTaskTemplate(
                      this.props.choreRecorderState,
                      this.state
                    );
                  }}
                >
                  <Text style={WHITETEXT.text}> Create </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveTaskTemplate,
      refreshItems
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
)(TaskTemplatesScreen);

const buttonStyle = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 35,
    right: 45
  },
  addbutton: {
    color: "#00BCD4"
  }
});

const MAINCONTAINER = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "column",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1
  }
});

const ADDTEMPLATE = StyleSheet.create({
  textinput: {
    position: "absolute",

    top: 0
  }
});

const TEXT = StyleSheet.create({
  title: {
    fontSize: 26,
    lineHeight: 25,
    padding: 6,
    textAlign: "left"
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
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20
  }
});

const TEXTINPUT = StyleSheet.create({
  input: {
    ...TEXT.text,
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    backgroundColor: "#fff",

    borderBottomWidth: 1,
    //borderWidth: 1,
    borderColor: "#00BCD4"
  }
});

const BUTTON = StyleSheet.create({
  button: {
    ...TEXT.text,
    textAlign: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  taskitem: {
    flex: 7,
    fontSize: 18
  },
  taskitemcheckbox: {
    flex: 1,
    justifyContent: "flex-start"
  },

  contentContainer: {
    //paddingTop: 30,
    alignItems: "flex-start"
  },

  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  dateselector: {
    //flex: 1,
    flexDirection: "row"
  }
});
