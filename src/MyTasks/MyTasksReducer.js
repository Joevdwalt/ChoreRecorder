import {
    combineReducers
} from 'redux';

import { _ } from 'lodash';
import moment  from 'moment';

const INITIAL_STATE = {
    date: moment().format('MMMM Do YYYY'),
    taskItems: [{
            key: '1',
            name: 'borsel tande',
            done: false
        },
        {
            key: '2',
            name: 'Wake up in the morning',
            done: false
        }, {
            key: '3',
            name: 'Kam hare',
            done: false
        },
        {
            key: '4',
            name: 'Another task',
            done: false
        }
    ], 
    saving: false
};

const MyTasksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHECK_ITEM':
            {
                const item = action.payload;
                newState = _.cloneDeep(state);

                itemToUpdate = _.findLast(newState.taskItems, itemInArray => {
                    return itemInArray.key == item.key
                });

                itemToUpdate.done = !item.done;
                return newState;

            }
        case 'REFRESH_ITEMS': {
            fetch('https:10.0.0.55:5001/Tasks', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                   
                }
            }).then((response) => 
            {
                response.json()
            })
            .then((responseJson) => {
              return responseJson.movies;
            })
            .catch((error) => {
              console.error(error);
            });
            newState = _.cloneDeep(state);
            return newState;

        }
        default:
            return state
    }
};

export default combineReducers({
    myTasksState: MyTasksReducer,
});