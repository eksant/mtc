import React, { Component } from 'react'
import {
  // Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  // NavItem,
  // NavLink,
} from 'reactstrap'
import PropTypes from 'prop-types'

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import { logout } from '../../utils/logout'
import logo from '../../assets/img/brand/logo-patraniaga.png'
import sygnet from '../../assets/img/brand/logo-symbol.png'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 40, alt: 'Pertamina' }}
          minimized={{ src: sygnet, width: 40, height: 40, alt: 'Pertamina' }}
        />

        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={'assets/img/avatars/user.png'}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem> */}
              {/* <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem> */}
              <DropdownItem onClick={() => logout()}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
