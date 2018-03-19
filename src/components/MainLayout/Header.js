import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
     <Menu.Item key="/index">
        <Link to="/index"><Icon type="bars" />Index</Link>
      </Menu.Item>
     <Menu.Item key="/test">
        <Link to="/test"><Icon type="bars" />Test</Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/users"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
