import {
  _
} from 'lodash';
import moment from 'moment';

import {
  Settings
} from '../common/Settings';
export function checkItem(state, item) {
  return dispatch => {
    dispatch(checkItemBegin);


    itemToUpdate = _.findLast(state.taskItems, itemInArray => {
      return itemInArray.id == item.id
    });

    itemToUpdate.done = !itemToUpdate.done;

    return fetch(Settings.serverUrl + '/Tasks/' + itemToUpdate.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.authorizationToken
      },
      body: JSON.stringify(itemToUpdate)

    }).then((response) => {
      dispatch(checkItemSuccess(itemToUpdate));

      return;

    }).catch((error) => {
      console.error(error);
      dispatch(checkItemFailure(error));
    });
  }
}

export const checkItemBegin = itemIndex => ({
  type: 'CHECK_ITEM_BEGIN'
})

export const checkItemSuccess = response => ({
  type: 'CHECK_ITEM_SUCCESS',
  payload: response
})

export const checkItemFailure = response => ({
  type: 'CHECK_ITEM_FAILURE'
})

export const beginRefreshItems = () => ({
  type: "BEGIN_REFRESH_ITEMS"
})

export const refreshItemsSuccess = (tasks) => ({
  type: 'REFRESH_ITEMS_SUCCESS',
  payload: tasks
});

export const refreshItemsFailure = () => ({
  type: 'REFRESH_ITEMS_FAILURE',
  payload: {}
});

export function refreshItems(state) {
  return dispatch => {
    dispatch(beginRefreshItems());

    var fromDate = moment().format(); 
    var toDate = moment().format(); 

    var query = "/Tasks/gettasksbydate/&fromDate=" + fromDate.toString() + "&toDate=" + toDate.toString();


    return fetch(Settings.serverUrl + query, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.authorizationToken
        }
      }).then((response) => {

        var body = JSON.parse(response._bodyText);
        dispatch(refreshItemsSuccess(body));
        return body;
      })

      .catch((error) => {
        console.error(error);
        dispatch(refreshItemsFailure(error));
      });
  };
}