import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown2';

const propTypes = {
  // Menu props.
  menuRole: PropTypes.string,
  rootCloseEvent: PropTypes.string,

  // Toggle props.
  variant: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /** @private */
  bsPrefix: PropTypes.string,

  // Override generated docs from <Dropdown>.
  /** @private */
  children: PropTypes.node
};

class DropdownButton extends React.Component {
  render() {
    const {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      disabled,
      ...props
    } = this.props;

    return (
      <Dropdown {...props}>
        <Dropdown.Toggle
          size={size}
          variant={variant}
          disabled={disabled}
          childBsPrefix={bsPrefix}
        >
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu role={menuRole} rootCloseEvent={rootCloseEvent}>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DropdownButton.propTypes = propTypes;

export default DropdownButton;
