import {
    _
} from 'lodash';
import moment from 'moment';
import {
    Settings
} from '../common/Settings';

// Refresh items
export const beginRefreshItems = () => ({
    type: "BEGIN_REFRESH_TEMPLATES"
});

export const refreshItemsSuccess = (tasks) => ({
    type: 'REFRESH_TEMPLATES_SUCCESS',
    payload: tasks
});

export const refreshItemsFailure = () => ({
    type: 'REFRESH_TEMPLATES_FAILURE',
    payload: {}
});



export function refreshItems(state) {
    return dispatch => {
        dispatch(beginRefreshItems());

        var fromDate = moment().format();
        var toDate = moment().format();

        var query = "/TaskTemplates/";


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

export const beginSaveTemplate = () => ({
    type: "BEGIN_SAVE_TASKTEMPLATE"
});

export const saveTemplateSuccess = () => ({
    type: "SAVE_TASKTEMPLATE_SUCCESS"
});

export const saveTemplateFailure = () => ({
    type: "SAVE_TASKTEMPLATE_FAILURE"
});

export function saveTaskTemplate(state, taskTemplate) {
    return dispatch => {
        dispatch(beginSaveTemplate());

        var method = "";
        if (!taskTemplate.Id) {
            method = "POST";
        } else {
            method = "PUT";
        }

        return fetch(Settings.serverUrl + '/TaskTemplates/', {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.authorizationToken
            },
            body: JSON.stringify(taskTemplate)

        }).then((response) => {
            dispatch(saveTemplateSuccess(taskTemplate));

            return;

        }).catch((error) => {
            console.error(error);
            dispatch(saveTemplateFailure(error));
        });
    }
}