import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class UserProfileSwitchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProfiles(this.props.choreRecorderState);
  }

  selectProfile(item){
    this.props.selectProfile(item);
    this.props.saveSelectedProfile(this.props.choreRecorderState, item);
    this.props.closeModal(false);
  }

  render() {
    return (
      <View>
        <Text style={TEXT.title}>Who is doing chores</Text>
        <FlatList
          refreshing={false}
          onRefresh={() =>
            this.props.loadProfiles(this.props.choreRecorderState)
          }
          data={this.props.choreRecorderState.userProfiles}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={()=>{
                this.selectProfile(item)
            }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadProfiles
    },
    dispatch
  );

const mapStateToProps = state => {
  const { choreRecorderState } = state;
  return { choreRecorderState };
};

/*function UserProfileSwitch() {
  return connect(mapStateToProps, mapDispatchToProps)(UserProfileSwitchScreen);
}*/

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
