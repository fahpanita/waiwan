import { Menu } from "antd";
import { Component } from "react";
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="">Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
