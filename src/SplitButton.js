import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Dropdown from './Dropdown2';

class SplitButton extends React.Component {
  static propTypes = {
    /**
     * Accessible label for the toggle; the value of `title` if not specified.
     */
    toggleLabel: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,

    // Menu props.
    menuRole: PropTypes.string,
    rootCloseEvent: PropTypes.string,

    // Toggle props.
    /** The Button variant (applies to both buttons) */
    variant: PropTypes.string,

    /** The Button size (applies to both buttons) */
    size: PropTypes.string,

    /**
     * The content of the non-toggle Button.
     */
    title: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    /** @private */
    bsPrefix: PropTypes.string,

    // Override generated docs from <Dropdown>.
    /** @private */
    children: PropTypes.node
  };

  static defaultProps = {
    toggleLabel: 'Toggle dropdown'
  };

  render() {
    const {
      bsPrefix,
      size,
      variant,
      title,
      toggleLabel,
      children,
      onClick,
      href,
      ...props
    } = this.props;

    return (
      <Dropdown {...props} componentClass={ButtonGroup}>
        <Button
          size={size}
          variant={variant}
          disabled={props.disabled}
          bsPrefix={bsPrefix}
          href={href}
          onClick={onClick}
        >
          {title}
        </Button>
        <Dropdown.Toggle
          split
          size={size}
          variant={variant}
          disabled={props.disabled}
          childBsPrefix={bsPrefix}
        >
          <span className="sr-only">{toggleLabel}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default SplitButton;
