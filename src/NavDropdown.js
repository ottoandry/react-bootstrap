import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown2';
import NavItem from './NavItem';
import NavLink from './NavLink';
import splitComponentProps from './utils/splitComponentProps';
// import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  title: PropTypes.node.isRequired,
  noCaret: PropTypes.bool,
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  activeHref: PropTypes.string,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: PropTypes.node
};

class NavDropdown extends React.Component {
  // isActive({ props }, activeKey, activeHref) {
  //   if (
  //     props.active ||
  //     (activeKey != null && props.eventKey === activeKey) ||
  //     (activeHref && props.href === activeHref)
  //   ) {
  //     return true;
  //   }

  //   if (
  //     ValidComponentChildren.some(props.children, child =>
  //       this.isActive(child, activeKey, activeHref)
  //     )
  //   ) {
  //     return true;
  //   }

  //   return props.active;
  // }

  render() {
    const {
      title,
      activeKey,
      className,
      style,
      children,
      eventKey: _,
      ...props
    } = this.props;

    return (
      <Dropdown
        {...props}
        componentClass={NavItem}
        className={classNames(className, { active: false })}
        style={style}
      >
        <Dropdown.Toggle eventKey={null} componentClass={NavLink}>
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {children}
          {/* {ValidComponentChildren.map(children, child =>
            React.cloneElement(child, {
              active: this.isActive(child, activeKey, activeHref)
            })
          )} */}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropdown.propTypes = propTypes;
NavDropdown.Item = Dropdown.Item;

export default NavDropdown;
