import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import SafeAnchor from './SafeAnchor';

import { createBootstrapComponent } from './ThemeProvider';

class DropdownToggle extends React.Component {
  static ROLE = 'toggle';
  static propTypes = {
    /**
     * @default 'dropdown-toggle'
     */
    bsPrefix: PropTypes.string,
    bsRole: PropTypes.string,
    title: PropTypes.string,

    split: PropTypes.bool,
    useAnchor: PropTypes.bool
  };

  static defaultProps = {
    useAnchor: false,
    bsRole: DropdownToggle.ROLE
  };

  render() {
    const {
      bsRole: _,
      bsPrefix,
      split,
      useAnchor,
      className,
      children,
      ...props
    } = this.props;

    const Component = useAnchor ? SafeAnchor : Button;

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <Component
        {...props}
        role="button"
        aria-haspopup
        className={classNames(
          className,
          bsPrefix,
          split && `${bsPrefix}-split`
        )}
      >
        {children}
      </Component>
    );
  }
}

export default createBootstrapComponent(DropdownToggle, 'dropdown-toggle');
