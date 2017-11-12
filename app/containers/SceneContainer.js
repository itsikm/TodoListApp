import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Tab, Tabs, TabHeading, Text, Input, Item, Drawer, Content} from 'native-base';

import TodoListScene from './TodoListScene';

/**
 * Scene Container
 */
class SceneContainer extends Component {

    /**
     * Close Drawer
     */
    closeDrawer () {
        this.drawer._root.close();
    }

    /**
     * Open Drawer
     */
    openDrawer () {
        this.drawer._root.open();
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <Container>
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    side={'right'}
                    content={<Content style={{backgroundColor:'#FFFFFF'}}>
                        <Text>Drawer</Text>
                    </Content>}
                    onClose={() => this.closeDrawer()} >
                    <Header searchBar hasTabs>
                        <Left>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" />
                            </Item>
                        </Left>
                        <Right>
                            <Button transparent onPress={()=>this.openDrawer()}>
                                <Icon name='md-add'/>
                            </Button>
                        </Right>
                    </Header>
                    <Tabs locked tabBarPosition={'top'}>
                        <Tab heading={<TabHeading><Icon name="md-clipboard" /><Text>Open</Text></TabHeading>}>
                            <TodoListScene status={'open'}/>
                        </Tab>
                        <Tab heading={ <TabHeading><Icon name="md-paper" /><Text>In progress</Text></TabHeading>}>
                            <TodoListScene status={'progress'} />
                        </Tab>
                        <Tab heading={ <TabHeading><Icon name="md-checkmark" /><Text>Done</Text></TabHeading>}>
                            <TodoListScene status={'done'} />
                        </Tab>
                    </Tabs>
                </Drawer>
            </Container>
        );
    }
}

export default SceneContainer;
