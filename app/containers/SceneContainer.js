/**
 * Import Dependencies
 */
import React, {Component} from 'react';
import {Container, Icon, Title, Tab, Tabs, TabHeading, Text} from 'native-base';
import TodoListScene from './TodoListScene';
import AddTodo from '../components/AddTodo';

/**
 * Scene Container
 */
class SceneContainer extends Component {

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <Container>
                <AddTodo />
                <Tabs locked tabBarPosition={'top'}>
                    <Tab heading={<TabHeading><Icon name="ios-browsers-outline" /><Text>Open</Text></TabHeading>}>
                        <TodoListScene status={'open'}/>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="ios-clock-outline" /><Text>In progress</Text></TabHeading>}>
                        <TodoListScene status={'progress'} />
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="md-checkmark" /><Text>Done</Text></TabHeading>}>
                        <TodoListScene status={'done'} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default SceneContainer;
