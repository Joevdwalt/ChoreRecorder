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
  Modal,
  Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { checkItem, refreshItems } from "./MyTasksActions/";
import { UserProfileSwitchScreen } from "../UserProfile/UserProfileSwitchScreen";
import {
  loadProfiles,
  selectProfile,
  saveSelectedProfile
} from "../UserProfile/UserProfileSwitchActions";


class MyTasksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  state = {
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
        <View>
          <View style={styles.dateselector}>
            <Text style={ICONMAN.iconman}>a</Text>

            <View>
              <Text style={TEXT.title}>
                {this.props.choreRecorderState.date}
              </Text>
              <Text style={TEXT.normal}>
                Completed {this.props.choreRecorderState.completedItems} of{" "}
                {this.props.choreRecorderState.totalTaskItems} chores
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text style={TEXT.normal}>
                {" "}
                Switch user:{" "}
                {this.props.choreRecorderState.userProfileSelected.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          refreshing={false}
          onRefresh={() =>
            this.props.refreshItems(this.props.choreRecorderState)
          }
          data={this.props.choreRecorderState.taskItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              onPress={() =>
                this.props.checkItem(this.props.choreRecorderState, item)
              }
            >
              <Text style={checkicons.icons}>
                {" "}
                {!item.done ? "ClearCheck" : "CheckedCheck"}{" "}
              </Text>

              <Text style={styles.taskitem}>
                {item.name + " (" + item.points + ")"}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            borderColor: "#E4E3E3",
            borderStyle: "solid",
            borderTopWidth: 1
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 46,
              padding: 6,

              color: "#4B70B9"
            }}
          >
            {this.props.choreRecorderState.totalTaskPointsEarned} of{" "}
            {this.props.choreRecorderState.totalTaskPoints} points earned
          </Text>
        </View>
        {this._renderSaving()}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //console.log("Close dialog");
          }}
        >
          <UserProfileSwitchScreen
            choreRecorderState={this.props.choreRecorderState}
            loadProfiles={this.props.loadProfiles}
            selectProfile={this.props.selectProfile}
            closeModal={this.setModalVisible}
            saveSelectedProfile={this.props.saveSelectedProfile}
          />
        </Modal>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkItem,
      refreshItems,
      loadProfiles,
      selectProfile,
      saveSelectedProfile
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
)(MyTasksScreen);

const MAINCONTAINER = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 0,
    flex: 1,
    flexDirection: "column",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1
  }
});

const ICONMAN = StyleSheet.create({
  iconman: {
    fontFamily: "Unititled",
    fontSize: 45,
    width: 45,
    textAlign: "center",
    padding: 0,
    color: "#243664"
  }
});

const checkicons = StyleSheet.create({
  icons: {
    color: "#4B70B9",
    fontSize: 30,
    fontFamily: "ChoreAppIcons"
  }
});

const TEXT = StyleSheet.create({
  title: {
    fontSize: 26,
    lineHeight: 25,
    padding: 1,
    textAlign: "left",
    color: "#243664",
    fontFamily: "Montserrat"
  },
  normal: {
    textAlign: "left",
    color: "#243664"
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  taskitem: {
    flex: 2,
    fontSize: 23,
    color: "#4B70B9"
  },
  taskitemcheckbox: {
    flex: 1,
    justifyContent: "flex-start"
  },

  contentContainer: {
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
