/**
 * Import Dependencies
 */
import _ from 'lodash';

/**
 * Initial State
 * @type {[null,null,null,null,null]}
 */
const initialState = [
    {id: 1, title: 'Clean up garage', createdAt: new Date(), status: 'open'},
    {id: 2, title: 'Install BBQ', createdAt: new Date(), status: 'open'},
    {id: 3, title: 'Watch NBA final', createdAt: new Date(), status: 'open'},
    {id: 4, title: 'Buy supprise egg', createdAt: new Date(), status: 'open'},
    {id: 5, title: 'Watch Iron Man 3', createdAt: new Date(), status: 'open'},
    {id: 6, title: 'Todo In Progress', createdAt: new Date(), status: 'progress'},
    {id: 7, title: 'Done with this shit!', createdAt: new Date(), status: 'done'}
];

/**
 * Todo Reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default (state = initialState, action = {}) => {
    switch (action.type) {

        /**
         * Add New Todo
         */
        case 'todo/add':
            return [...state, {
                id: Object.keys(state).length,
                title: action.title,
                createdAt: new Date(),
                completedAt: null,
                status: 'open'
            }];

        /**
         * Change Todo Status
         */
        case 'todo/status':
            return state.map(item => {
                if(item.id === action.id){
                    return { ...item, status: action.status };
                }

                return item;
            });

        /**
         * Remove Todo
         */
        case 'todo/remove':
            return _.remove(state, (n) => {
                return n.id !== action.id;
            });

        /**
         * Return default state
         */
        default:
            return state;
    }
}
