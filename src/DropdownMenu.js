import classNames from 'classnames';
import keycode from 'keycode';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

import { createBootstrapComponent } from './ThemeProvider';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

class DropdownMenu extends React.Component {
  static ROLE = 'menu';

  static propTypes = {
    /**
     * @default 'dropdown-menu'
     */
    bsPrefix: PropTypes.string,

    /** Controls the visibility of the Dropdown menu  */
    show: PropTypes.bool,

    /** Aligns the Dropdown menu to the right of it's container. */
    alignRight: PropTypes.bool,

    onClose: PropTypes.func,
    labelledBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSelect: PropTypes.func,
    rootCloseEvent: PropTypes.oneOf(['click', 'mousedown'])
  };

  static defaultProps = {
    bsRole: DropdownMenu.ROLE,
    alignRight: false
  };

  getFocusableMenuItems() {
    const node = ReactDOM.findDOMNode(this);
    if (!node) return [];
    return Array.from(node.querySelectorAll('[tabIndex="-1"]'));
  }

  getItemsAndActiveIndex() {
    const items = this.getFocusableMenuItems();
    const activeIndex = items.indexOf(document.activeElement);

    return { items, activeIndex };
  }

  focusNext() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  }

  focusPrevious() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  }

  handleKeyDown = event => {
    switch (event.keyCode) {
      case keycode.codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case keycode.codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        this.props.onClose(event, { source: 'keydown' });
        break;
      default:
    }
  };

  handleRootClose = event => {
    this.props.onClose(event, { source: 'rootClose' });
  };

  render() {
    const {
      bsRole: _0,
      bsPrefix,
      show,
      alignRight,
      labelledBy,
      onSelect,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;

    return (
      <RootCloseWrapper
        disabled={!show}
        onRootClose={this.handleRootClose}
        event={rootCloseEvent}
      >
        <div
          {...props}
          role="menu"
          aria-labelledby={labelledBy}
          className={classNames(
            className,
            bsPrefix,
            show && 'show',
            alignRight && `${bsPrefix}-right`
          )}
        >
          {ValidComponentChildren.map(children, child =>
            React.cloneElement(child, {
              onKeyDown: createChainedFunction(
                child.props.onKeyDown,
                this.handleKeyDown
              ),
              onSelect: createChainedFunction(child.props.onSelect, onSelect)
            })
          )}
        </div>
      </RootCloseWrapper>
    );
  }
}

export default createBootstrapComponent(DropdownMenu, 'dropdown-menu');
