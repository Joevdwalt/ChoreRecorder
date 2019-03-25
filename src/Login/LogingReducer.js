import {
    combineReducers
} from 'redux';

const INITIAL_STATE = {
    "loginDetail": {
        "username": "",
        "password": ""
    }
}

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'LOGIN': {
            console.log(JSON.stringify(state));

        }
    }

}
export default combineReducers({
    loginState: LoginReducer,
});