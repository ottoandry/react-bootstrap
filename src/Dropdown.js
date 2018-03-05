import classNames from 'classnames';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import keycode from 'keycode';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import all from 'prop-types-extra/lib/all';
import elementType from 'prop-types-extra/lib/elementType';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';
import warning from 'warning';

import ButtonGroup from './ButtonGroup';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
import Popper from './Popper';
import createChainedFunction from './utils/createChainedFunction';
import { exclusiveRoles, requiredRoles } from './utils/PropTypes';
import ValidComponentChildren from './utils/ValidComponentChildren';

const TOGGLE_ROLE = 'toggle';
const MENU_ROLE = 'menu';

const propTypes = {
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  componentClass: elementType,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: PropTypes.func.isRequired,

  /**
   * Whether or not component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  alignRight: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  defaultOpen: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable show
   */
  onToggle: PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: PropTypes.string,

  /**
   * Which event when fired outside the component will cause it to be closed
   *
   * *Note: For custom dropdown components, you will have to pass the
   * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
   * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: PropTypes.func,
  /**
   * @private
   */
  onMouseLeave: PropTypes.func
};

const defaultProps = {
  componentClass: ButtonGroup
};

class Dropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._focusInDropdown = false;
    this.lastOpenEventType = null;
  }

  componentDidMount() {
    this.focusNextOnOpen();
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.show && this.props.show) {
      this._focusInDropdown = contains(
        ReactDOM.findDOMNode(this.menu),
        activeElement(document)
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    const prevOpen = prevProps.show;

    if (show && !prevOpen) {
      this.focusNextOnOpen();
    }

    if (!show && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  }

  getMenu = () => ReactDOM.findDOMNode(this.menu);
  getToggle = () => ReactDOM.findDOMNode(this.toggle);

  getContainer = () => {
    return this.getMenu() && this.getMenu().parentNode;
  };

  focus() {
    const toggle = ReactDOM.findDOMNode(this.toggle);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  }

  focusNextOnOpen() {
    const menu = this.menu;

    if (!menu || !menu.focusNext) {
      return;
    }

    if (
      this.lastOpenEventType === 'keydown' ||
      this.props.role === 'menuitem'
    ) {
      menu.focusNext();
    }
  }

  handleClick = event => {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen(event, { source: 'click' });
  };

  handleClose = (event, eventDetails) => {
    if (!this.props.show) {
      return;
    }

    this.toggleOpen(event, eventDetails);
  };

  handleKeyDown = event => {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case keycode.codes.down:
        if (!this.props.show) {
          this.toggleOpen(event, { source: 'keydown' });
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        this.handleClose(event, { source: 'keydown' });
        break;
      default:
    }
  };

  toggleOpen(event, eventDetails) {
    let show = !this.props.show;

    if (show) {
      this.lastOpenEventType = eventDetails.source;
    }

    if (this.props.onToggle) {
      this.props.onToggle(show, event, eventDetails);
    }
  }
  attachToggleRef = ref => {
    this.menu = ref;
  };
  attachMenuRef = ref => {
    this.menu = ref;
  };
  renderMenu({
    id,
    onSelect,
    rootCloseEvent,
    alignRight,
    drop,
    show,
    ...props
  }) {
    let ref = c => {
      this.menu = c;
    };

    let placement = alignRight ? 'bottom-end' : 'bottom-start';
    if (drop === 'up') placement = alignRight ? 'top-end' : 'top-start';
    if (drop === 'right') placement = 'right-start';
    if (drop === 'left') placement = 'left-start';

    return (
      <Popper
        placement={placement}
        getTarget={this.getToggle}
        shouldUpdatePosition={show}
      >
        {({ styles }) =>
          cloneElement(child, {
            ...props,
            ref,
            alignRight,
            show,
            style: styles,
            labelledBy: id,
            onClose: createChainedFunction(
              child.props.onClose,
              this.handleClose
            ),
            onSelect: createChainedFunction(
              child.props.onSelect,
              onSelect,
              (key, event) => this.handleClose(event, { source: 'select' })
            ),
            rootCloseEvent
          })
        }
      </Popper>
    );
  }

  renderToggle(child, props) {
    warning(
      typeof child.ref !== 'string',
      'String refs are not supported on `<Dropdown.Toggle>` components. ' +
        'To apply a ref to the component use the callback signature:\n\n ' +
        'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute'
    );

    let ref = createChainedFunction(child.ref, c => {
      this.toggle = c;
    });

    return cloneElement(child, {
      ...props,
      ref,
      onClick: createChainedFunction(child.props.onClick, this.handleClick),
      onKeyDown: createChainedFunction(
        child.props.onKeyDown,
        this.handleKeyDown
      )
    });
  }

  render() {
    const {
      bsRole: _,
      componentClass: Component,
      id,
      drop,
      disabled,
      alignRight,
      show,
      onSelect,
      role,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;

    delete props.onToggle;

    const classes = { show, disabled };
    switch (drop) {
      case 'up':
        classes.dropup = true;
        break;
      case 'right':
        classes.dropright = true;
        break;
      case 'left':
        classes.dropleft = true;
        break;
      case 'down':
      default:
        break;
    }

    // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <Component {...props} className={classNames(className, classes)}>
        {ValidComponentChildren.map(children, child => {
          switch (child.props.bsRole) {
            case TOGGLE_ROLE:
              return this.renderToggle(child, {
                id,
                disabled,
                role,
                'aria-expanded': show
              });
            case MENU_ROLE:
              return this.renderMenu(child, {
                id,
                show,
                drop,
                alignRight,
                onSelect,
                rootCloseEvent
              });
            default:
              return child;
          }
        })}
      </Component>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

const UncontrolledDropdown = uncontrollable(Dropdown, { show: 'onToggle' });

UncontrolledDropdown.Toggle = DropdownToggle;
UncontrolledDropdown.Menu = DropdownMenu;

export default UncontrolledDropdown;
