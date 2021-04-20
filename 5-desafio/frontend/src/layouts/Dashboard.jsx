import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Button } from 'antd';

import dashboardRoutes from "../routes/dashboard";
import { Switch, Route, Redirect, Link } from "react-router-dom";


const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1"><Icon type="user" />Profile</Menu.Item>
    <Menu.Divider />
      <Menu.Item key="3"><Icon type="logout" /><a href="/accounts/logout/" target="_self">Logout</a> </Menu.Item>
  </Menu>
);

const {
    Header, Content, Footer, Sider,
} = Layout;

class Dashboard extends Component {

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
        console.log("WINDOW LOCATION!! " , window.location.pathname)
        dashboardRoutes.forEach((item, index) => {
            if(item.path === window.location.pathname){
                this.state = { initialMenuSelected: index };
            }
        });
        if(!this.state || !this.state.initialMenuSelected){
            this.state = { initialMenuSelected: 0 };
        }
    }

    onClickMenuItem = (item, index, selectedKeys) => {
        console.log("ESTO FUNCIONA ??? ", item.item.props.path);
        this.props.history.push(item.item.props.path);
    };

    render() {
        const menuItems  = dashboardRoutes.map((prop, index) =>
            <Menu.Item key={index} path={prop.path}>
                <Icon type={prop.icon} />
                <span className="nav-text">{prop.sidebarName}</span>
            </Menu.Item>
        );
        return (
            <Layout style={{ minHeight: '100%'}}>
                <Sider
                    defaultSelectedKeys={[this.state.initialMenuSelected]}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    style={{ minHeight: '100%'}}
                >
                    <div id="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.initialMenuSelected]} onSelect={this.onClickMenuItem}>
                        {menuItems}
                    </Menu>
                </Sider>
                <Layout style={{ width: '100%'}}>
                    <Header style={{ background: '#fff', padding: 0, position: 'sticky', zIndex: 100, width: 'inherit', maxWidth: 'inherit' }}>
                        <div id="rightMenu" style={{ float: 'right', padding: '0px 15px'}}>
                            <Dropdown overlay={menu} >
                                <Button type="primary" shape="circle" icon="user" size='large' />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content id="content">
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, marginTop: '20px' }}>
                            {switchRoutes}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Matias Roson ©2019
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Dashboard;
