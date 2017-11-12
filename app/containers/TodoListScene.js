/**
 * Import Dependencies
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ListView } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';

/**
 * TodoList Scene
 */
class TodoListScene extends Component {

    /**
     * Constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        // Create ListView Data Source
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    /**
     * Row Action
     * @param {string} action
     * @param {number} Id
     * @param {number} secId
     * @param {number} rowId
     * @param {Object} rowMap
     */
    rowAction (action, data, secId, rowId, rowMap) {
        // close row
        rowMap[`${secId}${rowId}`].props.closeRow();

        // execute action
        this.props[action](data)
    }

    /**
     * Render Right Hidden Row
     * @param {Object} data
     * @param {number} secId
     * @param {number} rowId
     * @param {Object} rowMap
     * @returns {XML}
     */
    renderRightHiddenRow (data, secId, rowId, rowMap) {
        switch (this.props.status) {
            case 'open':
                return (
                    <Button full onPress={_ => this.rowAction('changeTodoStatus', {id: data.id, status: 'progress'}, secId, rowId, rowMap)}>
                        <Icon active name="md-paper"/>
                    </Button>
                );

            case 'progress':
                return (
                    <Button full success onPress={_ => this.rowAction('changeTodoStatus', {id: data.id, status: 'done'}, secId, rowId, rowMap)}>
                        <Icon active name="md-checkmark"/>
                    </Button>
                );

            case 'done':
                return (
                    <Button full onPress={_ => this.rowAction('changeTodoStatus', {id: data.id, status: 'open'}, secId, rowId, rowMap)}>
                        <Icon active name="md-refresh"/>
                    </Button>
                );
        }
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <Container>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.props.todos.filter(t => t.status == this.props.status))}
                        renderRow={
                            data =>
                                <ListItem style={{padding: 20}}>
                                    <Icon active name="ios-square-outline" style={{fontSize: 20, marginRight: 10}}/><Text> {data.title} </Text>
                                </ListItem>
                        }
                        renderRightHiddenRow={this.renderRightHiddenRow.bind(this)}
                        renderLeftHiddenRow={
                            (data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => this.rowAction('removeToDo', data.id, secId, rowId, rowMap)}>
                                    <Icon active name="trash"/>
                                </Button>
                        }
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        )
    }
}

/**
 * Redux mapStateToProps
 * @param state
 * @returns {{todos: *}}
 */
const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

/**
 * Redux mapDispatchToProps
 * @param dispatch
 * @returns {{openTodo: (function(*)), startTodo: (function(*)), doneTodo: (function(*)), removeToDo: (function(*))}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        /**
         * Change Todo Status
         * @param {Object} data
         */
        changeTodoStatus: (data) => {
            dispatch({
                type: 'todo/status',
                ...data
            });
        },

        /**
         * Remove Todo
         * @param {Object} data
         */
        removeToDo: (data) => {
            dispatch({
                type: 'todo/remove',
                ...data
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListScene);
