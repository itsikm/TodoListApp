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
    {id: 5, title: 'Todo In Progress', createdAt: new Date(), status: 'progress'},
    {id: 5, title: 'Done with this shit!', createdAt: new Date(), status: 'done'}
];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'todo/add':
            return [...state, {
                id: action.id,
                title: action.title,
                createdAt: new Date(),
                completedAt: null,
                status: 'open'
            }];

        case 'todo/open':
            return state.map(item => {
                if(item.id === action.id){
                    return { ...item, status: 'open' }
                }

                return item
            });

        case 'todo/start':
            return state.map(item => {
                if(item.id === action.id){
                    return { ...item, status: 'progress' }
                }

                return item
            });

        case 'todo/done':
            return state.map(item => {
                if(item.id === action.id){
                    return { ...item, status: 'done' }
                }

                return item
            });

        case 'todo/status':
            return state.map(item => {
                if(item.id === action.id){
                    return { ...item, status: action.status }
                }

                return item
            });

        case 'todo/remove':
            return _.remove(state, (n) => {
                return n.id !== action.id;
            });

        default:
            return state;
    }
}
