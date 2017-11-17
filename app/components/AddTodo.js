/**
 * Import Dependencies
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Header, Left, Right, Button, Icon, Item, Input } from 'native-base';

/**
 * Add Todo
 */
class AddTodo extends Component {

    /**
     * Constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = { title: '' };
    }

    /**
     * Add Todo
     */
    addTodo() {
        if (this.state.title) {
            this.props.addToDo(this.state);
            this.setState({ title: '' });
        }
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <Header style={{backgroundColor: 'white'}}>
                <Left>
                    <Item>
                        <Input placeholder='Add Todo' onChangeText={(title) => this.setState({title})} value={this.state.title} />
                        <Button transparent onPress={this.addTodo.bind(this)}>
                            <Icon name='md-add' />
                        </Button>
                    </Item>
                </Left>
            </Header>
        );
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
 */
const mapDispatchToProps = (dispatch) => {
    return {
        /**
         * Add Todo
         * @param {Object} data
         */
        addToDo: (data) => {
            dispatch({
                type: 'todo/add',
                ...data
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
