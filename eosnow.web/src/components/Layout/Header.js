import React from 'react'
import PropTypes from 'prop-types'
import { notification, Menu, Icon, Popover, Layout } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

const Header = ({
  user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu, WALLET_NAME
}) => {
  const handleClickMenu = (e) => {
    if ( e.key === 'logout' ) {
      logout()
    } else if ( e.key === 'private' ) {
      // 展示私有 key
      notification.open({
        message: 'private key for your wallet',
        description: '`' + localStorage.getItem("WALLET_PRIVATE_KEY") + '`, use this key for unlock or login to your wallet. do not forget it.',
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
        duration: 15,
      });
    }
  }

  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <Layout.Header className={styles.header}>
      <div
        className={styles.button}
        onClick={switchSider}
      >
        <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
      </div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="wallet" />
              {WALLET_NAME}
            </span>}
          >
            <Menu.Item key="logout">
              Sign out
            </Menu.Item>
            <Menu.Item key="private">
              查看 PRIVATE_KEY
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  WALLET_NAME: PropTypes.string
}

export default Header
