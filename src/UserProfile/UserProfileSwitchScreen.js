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
import { bold } from "ansi-colors";

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
      <View style={DEFAULT.container}>
        <Text style={TEXT.title}>Who is doing chores</Text>
        <FlatList
        contentContainerStyle={{borderColor: "#E4E3E3",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1}}
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
            }}>
              <View style={DEFAULT.row}>
                <View style={DEFAULT.CircleShapeView}>
                    <Text style={DEFAULT.CircleShapeViewText}>{item.name[0]}</Text>
                </View>
                <View style={DEFAULT.NameAgeContainer}>
                  <Text style={DEFAULT.NameHeader}>{item.name}</Text>
                  <Text style={DEFAULT.AgeHeader}>Age { item.age}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    );
  }
}


const DEFAULT = StyleSheet.create({
  container: {
    margin: 20
  },
  CircleShapeView: {
    width: 55,
    height: 55,
    borderRadius: 150/2,
    backgroundColor: '#EA58ED'
  },
  CircleShapeViewText:
  {
    textAlign: "center",
    marginTop:7,
    fontSize:35,
    color: "#FFFFFF"
  },
  row: {
    
    paddingTop:5,
    paddingBottom:5,
    flexDirection:"row",
    
    
    
    marginLeft:0
  },
  NameAgeContainer: {
    marginTop: 7,
    marginLeft: 7
  },
  NameHeader:{
    fontSize: 24,
    color: "#243664",
    fontFamily: "Montserrat"
  },
  AgeHeader:{
    fontSize:12,
    color:"#3F5A9F"
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
