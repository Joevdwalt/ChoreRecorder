import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { checkItem, refreshItems } from "./MyTasksActions/";

class MyTasksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.refreshItems(this.props.choreRecorderState);
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
              <Text style={TEXT.normal}>Completed {this.props.choreRecorderState.completedItems} of {this.props.choreRecorderState.totalTaskItems} chores</Text>
            </View>
          </View>
        </View>
        <FlatList
          refreshing={false}
          onRefresh={() =>
            this.props.refreshItems(this.props.choreRecorderState)
          }
          data={this.props.choreRecorderState.taskItems}
          renderItem={({ item }) => (
            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <Ionicons
                style={styles.taskitemcheckbox}
                name={!item.done ? "ios-checkbox-outline" : "ios-checkbox"}
                size={26}
                onPress={() =>
                  this.props.checkItem(this.props.choreRecorderState, item)
                }
              />
              <Text style={styles.taskitem}>{item.name}</Text>
            </View>
          )}
        />

        {this._renderSaving()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkItem,
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
)(MyTasksScreen);

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

const TEXT = StyleSheet.create({
  title: {
    fontSize: 26,
    lineHeight: 25,
    padding: 1,
    textAlign: "left",
    color: "#243664"
  },
  normal: {
    textAlign: "left",
    color: "#243664"
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
