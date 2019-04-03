import {
    combineReducers
} from 'redux';

import {
    _
} from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
    "registerSaving": false,
    "registerCompleted": false,
    "registerFailureReason": "",

    "loggingIn": false,
    "loggedin": false,
    "loggedinUser": "joevdwalt",
    "logginFailureReason": "",
    "authorizationToken": "",
    "loginDetail": {
        "username": "",
        "password": ""
    },
    date: moment().format('MMMM Do YYYY'),
    taskItems: [],
    saving: false
};


const ChoreRecorderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_BEGIN':
            {
                newState = _.cloneDeep(state);
                newState.loggingIn = true;

                return newState;
            }

        case 'LOGIN_SUCCESS':
            {
                newState = _.cloneDeep(state);

                var response = action.payload;

                newState.loggedin = true;
                newState.loggedinUser = JSON.parse(response._bodyText).username;
                newState.authorizationToken = JSON.parse(response._bodyText).token;
                newState.loggingIn = false;
                console.log("Bearer token:" + newState.authorizationToken);
                console.log("Username:" + newState.loggedinUser);
                console.log("Body: " + JSON.parse(response._bodyText).token);


                return newState;
            }

        case 'LOGIN_FAILURE':
            {
                newState = _.cloneDeep(state);
                var response = action.payload;

                newState.logginFailureReason = JSON.parse(response._bodyText).message;

                return newState;
            }

        case 'REGISTER_BEGIN':
            {
                newState = _.cloneDeep(state);
                newState.registerSaving = true;
                return newState;
            }

        case 'REGISTER_SUCCESS':
            {
                newState = _.cloneDeep(state);

                var response = action.payload;
                newState.registerCompleted = true;

                return newState;
            }

        case 'REGISTER_FAILURE':
            {
                newState = _.cloneDeep(state);
                var response = action.payload;

                newState.registerFailureReason = JSON.parse(response._bodyText).message;

                return newState;
            }

        case 'REGISTER_RESET':
            {
                newState = _.cloneDeep(state);
                newState.registerSaving = false;
                newState.registerCompleted = false;
                
                return newState;
            }

        case 'CHECK_ITEM_SUCCESS':
            {
                const item = action.payload;
                newState = _.cloneDeep(state);

                itemToUpdate = _.findLast(newState.taskItems, itemInArray => {
                    return itemInArray.id == item.id
                });

                itemToUpdate = action.payload;
                return newState;

            }
        case 'BEGIN_REFRESH_ITEMS':
            {
                return state;
            }
        case 'REFRESH_ITEMS_SUCCESS':
            {

                newState = _.cloneDeep(state);
                newState.taskItems = action.payload;
                return newState;


            }
        default:
            return state
    }
};

export default combineReducers({
    choreRecorderState: ChoreRecorderReducer,
});