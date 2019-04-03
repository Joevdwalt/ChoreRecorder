import {
    Settings
} from '../common/Settings';

export const registerBegin = () => ({
    type: "REGISTER_BEGIN"
});

export const registerSuccess = (result) => ({
    type: "REGISTER_SUCCESS",
    payload: result
})

export const registerFailure = (result) => ({
    type: "REGISTER_FAILURE",
    payload: result
})

export const registerReset = (result) => ({
    type: "REGISTER_RESET",
    payload: result
})

export function register(state) {
    return dispatch => {
        dispatch(registerBegin());

        fetch(Settings.serverUrl + '/User/register', {
                method: 'POST',
                body: JSON.stringify({
                    firstname: state.firstname,
                    lastname: state.lastname,
                    username: state.username,
                    password: state.password,
                    confirmPassword: state.confirmPassword
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => //Finish this. 
                {
                    if (response.status == 200) {
                        dispatch(registerSuccess(response));

                    } else {
                        dispatch(registerFailure(response))
                    }
                })
            .catch((error) => {
                dispatch(registerFailure(error))
            });
    }
}