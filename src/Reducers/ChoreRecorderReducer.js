import { combineReducers } from "redux";

import { _ } from "lodash";
import moment from "moment";

const INITIAL_STATE = {
  registerSaving: false,
  registerCompleted: false,
  registerFailureReason: "",
  loggingIn: false,
  loggedin: false,
  loggedinUser: "joevdwalt",
  logginFailureReason: "",
  authorizationToken: "",
  loginDetail: {
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  },
  taskTemplates: [],
  totalTaskItems: 0,
  completedItems: 0,
  totalTaskPoints: 0,
  totalTaskPointsEarned: 0,

  date: moment().format("MMMM Do YYYY"),
  taskItems: [],
  saving: false
};

const ChoreRecorderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_BEGIN": {
      newState = _.cloneDeep(state);
      newState.loggingIn = true;

      return newState;
    }

    case "LOGIN_SUCCESS": {
      newState = _.cloneDeep(state);

      var response = action.payload;

      var resultPayload = JSON.parse(response._bodyText);
      newState.loggedin = true;

      newState.loggedinUser = resultPayload.username;
      newState.authorizationToken = resultPayload.token;
      newState.loggingIn = false;
      newState.loginDetail.firstname = resultPayload.firstName;
      newState.loginDetail.lastname = resultPayload.lastName;

      console.log("Bearer token:" + newState.authorizationToken);
      console.log("Username:" + newState.loggedinUser);
      console.log("Body: " + resultPayload.token);

      return newState;
    }

    case "LOGIN_FAILURE": {
      newState = _.cloneDeep(state);
      var response = action.payload;

      newState.logginFailureReason = JSON.parse(response._bodyText).message;

      return newState;
    }

    case "REGISTER_BEGIN": {
      newState = _.cloneDeep(state);
      newState.registerSaving = true;
      return newState;
    }

    case "REGISTER_SUCCESS": {
      newState = _.cloneDeep(state);

      var response = action.payload;
      newState.registerCompleted = true;

      return newState;
    }

    case "REGISTER_FAILURE": {
      newState = _.cloneDeep(state);
      var response = action.payload;

      newState.registerFailureReason = JSON.parse(response._bodyText).message;

      return newState;
    }

    case "REGISTER_RESET": {
      newState = _.cloneDeep(state);
      newState.registerSaving = false;
      newState.registerCompleted = false;

      return newState;
    }

    case "CHECK_ITEM_SUCCESS": {
      const item = action.payload;
      newState = _.cloneDeep(state);

      itemToUpdate = _.findLast(newState.taskItems, itemInArray => {
        return itemInArray.id == item.id;
      });

      itemToUpdate = action.payload;

      newState.completedItems = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = 0;
          if (item.done) {
            toAdd = 1;
          }
          return toAdd + n;
        },
        0
      );
      newState.totalTaskPoints = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = item.points;
          return toAdd + n;
        },
        0
      );

      newState.totalTaskPointsEarned = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = 0;
          if (item.done) {
            toAdd = item.points;
          }

          return toAdd + n;
        },
        0
      );
      return newState;
    }
    case "BEGIN_REFRESH_ITEMS": {
      return state;
    }
    case "REFRESH_ITEMS_SUCCESS": {
      newState = _.cloneDeep(state);
      newState.taskItems = action.payload;
      newState.totalTaskItems = newState.taskItems.length;
      newState.completedItems = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = 0;
          if (item.done) {
            toAdd = 1;
          }

          return toAdd + n;
        },
        0
      );

      newState.totalTaskPoints = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = item.points;
          return toAdd + n;
        },
        0
      );

      newState.totalTaskPointsEarned = _.reduce(
        newState.taskItems,
        function(n, item) {
          var toAdd = 0;
          if (item.done) {
            toAdd = item.points;
          }

          return toAdd + n;
        },
        0
      );

      return newState;
    }

    case "REFRESH_TEMPLATES_SUCCESS": {
      newState = _.cloneDeep(state);
      newState.taskTemplates = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  choreRecorderState: ChoreRecorderReducer
});
