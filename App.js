/**
 * Import Dependencies
 */
import React from 'react';
import {
    createStore,
    applyMiddleware
} from 'redux';
import {Provider} from 'react-redux';
import SceneContainer from './app/containers/SceneContainer';
import Reducers from './app/reducers';

/**
 * Dev Dependency
 */
import { AppLoading, Font } from 'expo';

/**
 * Redux Store
 * @type {Store<GenericStoreEnhancer>}
 */
const store = createStore(
    Reducers
);

/**
 * TodoApp
 */
class TodoApp extends React.Component {

    state = {
        loaded: false,
    };

    /**
     * Component Will Mount
     */
    componentWillMount() {
        this._loadFontsAsync();
    }

    /**
     * Async Font Loader
     * @returns {Promise.<void>}
     * @private
     */
    async _loadFontsAsync() {
        await Font.loadAsync({
            'Roboto': require('./node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loaded: true });
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        if (!this.state.loaded) {
            return <AppLoading />;
        }

        return (
            <Provider store={store}>
                <SceneContainer/>
            </Provider>
        );
    }
}

export default TodoApp;
