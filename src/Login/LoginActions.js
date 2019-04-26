import { Settings } from '../common/Settings';
import { AsyncStorage} from 'react-native';
export const loginBegin = () => ({
  type: "LOGIN_BEGIN"
});

export const loginSuccess = (result) => ({
  type: "LOGIN_SUCCESS",
  payload: result
})

export const loginFailure = (result) => ({
  type: "LOGIN_FAILURE",
  payload: result
})
export function login(state) {
  return dispatch => {
    dispatch(loginBegin());

    fetch(Settings.serverUrl +'/User/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          username: state.username,
          password: state.password
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => //Finish this. 
        {
          //console.log(JSON.stringify(response));


          //var result = JSON.parse(response);
          if (response.status == 200) {
            dispatch(loginSuccess(response));

          } else {
            dispatch(loginFailure(response))
          }


        })
      .catch((error) => {
        console.error(error);
      });
  }
}

export const loadAppStateSuccess = (result) => ({
  type: "LOADAPPSTATE_SUCCESS",
  payload: result
})

export function loadAppState(){
  return async dispatch => {
    try {
      await AsyncStorage.getItem("localdata").then((result) => {
        if (result) {
            try {
                result = JSON.parse(result);
                dispatch(loadAppStateSuccess(result));
            } catch (e) {
                 console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
            }
        }
        return result;
    });

    } catch (error) {
      //Error saving data
      console.log(error.toString());
    }
  };
}

