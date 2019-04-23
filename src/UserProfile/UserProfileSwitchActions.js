import { _ } from "lodash";
import moment from "moment";

import { Settings } from "../common/Settings";

export function loadProfiles(state) {
  return dispatch => {
    dispatch(loadProfilesBegin);

    return fetch(Settings.serverUrl + "/Profile/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.authorizationToken
      }
    })
      .then(response => {
        var body = JSON.parse(response._bodyText);
        dispatch(loadProfilesSuccess(body));

        return;
      })
      .catch(error => {
        console.error(error);
        dispatch(checkItemFailure(error));
      });
  };
}

export const loadProfilesBegin = itemIndex => ({
  type: "LOAD_PROFILES_BEGIN"
});

export const loadProfilesSuccess = response => ({
  type: "LOAD_PROFILES_SUCCESS",
  payload: response
});

export const checkItemFailure = response => ({
  type: "LOAD_PROFILES_FAILURE"
});

export const selectProfile = item => ({
  type: "SELECT_PROFILE",
  payload: item
});
