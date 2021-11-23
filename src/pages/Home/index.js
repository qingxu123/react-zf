import React from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import './index.css'

import News from '../News'
import Index from '../index'
import HouseList from "../HouseList";
import Profile from "../Profile";
export default class Home extends  React.Component {
    state = {
        selectedTab: this.props.location.name,
    }

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           fullScreen: !this.state.fullScreen,
                       });
                   }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="home">
                <Route path="/home/news" component={News} ></Route>
                <Route path="/home/index" component={Index} ></Route>
                <Route path="/home/list" component={HouseList} ></Route>
                <Route path="/home/profile" component={Profile} ></Route>
                    <TabBar
                        tintColor="#21b97a"
                        barTintColor="white"
                        noRenderContent = {true}
                    >
                        <TabBar.Item
                            title="首页"
                            key="Life"
                            icon={
                                <i className="iconfont icon-ind"></i>
                            }
                            selectedIcon={ <i className="iconfont icon-ind"></i>
                            }
                            selected={
                                this.state.selectedTab === '/home/index'
                            }
                            onPress={() => {
                                this.setState({
                                   selectedTab:'/home/index' ,
                                });
                                this.props.history.push('/home/index')
                            }}
                            data-seed="logId"
                        >

                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <i className="iconfont icon-findHouse"></i>
                            }
                            selectedIcon={
                                <i className="iconfont icon-findHouse"></i>
                            }
                            title="找房"
                            key="Koubei"
                            selected={this.state.selectedTab === '/home/list'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '/home/list',
                                });
                                this.props.history.push('/home/list')
                            }}
                            data-seed="logId1"
                        >

                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <i className="iconfont icon-infom"></i>
                            }
                            selectedIcon={
                                <i className="iconfont icon-infom"></i>
                            }
                            title="资讯"
                            key="Friend"
                            selected={this.state.selectedTab === '/home/news'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '/home/news',
                                });
                                this.props.history.push('/home/news')
                            }}
                        >

                        </TabBar.Item>
                        <TabBar.Item
                            icon={ <i className="iconfont icon-my"></i>}
                            selectedIcon={ <i className="iconfont icon-my"></i>}
                            title="我的"
                            key="my"
                            selected={this.state.selectedTab === '/home/profile'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'home/profile',
                                });
                                this.props.history.push('/home/profile')
                            }}
                        >

                        </TabBar.Item>
                    </TabBar>
            </div>
        )
    }
}
