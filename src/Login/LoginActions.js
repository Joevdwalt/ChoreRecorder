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

    fetch('http://10.0.0.55:5001/User/authenticate', {
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
       // console.error(error);
      });
  }
}